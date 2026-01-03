import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse

from models import (
    FormatRequest,
    UploadResponse,
    FormatResponse,
    PreviewResponse,
)
from services import document_processor

router = APIRouter(prefix="/api", tags=["document"])

MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB
ALLOWED_EXTENSIONS = {".docx"}


@router.post("/upload", response_model=UploadResponse)
async def upload_document(file: UploadFile = File(...)):
    """Upload a Word document"""

    # Validate file extension
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}",
        )

    # Read file content
    content = await file.read()

    # Validate file size
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size is {MAX_FILE_SIZE // (1024 * 1024)}MB",
        )

    # Save file
    try:
        file_id = document_processor.save_uploaded_file(content, file.filename)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")

    return UploadResponse(
        file_id=file_id,
        filename=file.filename,
        size=len(content),
        message="File uploaded successfully",
    )


@router.post("/format", response_model=FormatResponse)
async def format_document(request: FormatRequest):
    """Format a document with the specified options"""

    try:
        formatted_file_id = document_processor.format_document(
            request.file_id, request.options
        )
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Document not found")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to format document: {str(e)}"
        )

    return FormatResponse(
        file_id=formatted_file_id,
        original_filename=f"{request.file_id}.docx",
        formatted_filename=f"{formatted_file_id}_formatted.docx",
        message="Document formatted successfully",
    )


@router.get("/preview/{file_id}")
async def preview_document(file_id: str):
    """Get a preview of the document"""

    try:
        preview = document_processor.get_document_preview(file_id)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Document not found")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to generate preview: {str(e)}"
        )

    return PreviewResponse(
        file_id=file_id,
        content=preview["content"],
        page_count=preview["page_count"],
    )


@router.get("/download/{file_id}")
async def download_document(file_id: str):
    """Download the formatted document"""

    # First try formatted version
    formatted_path = os.path.join(
        document_processor.upload_dir, f"{file_id}_formatted.docx"
    )

    if os.path.exists(formatted_path):
        return FileResponse(
            formatted_path,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            filename=f"formatted_document.docx",
        )

    # Try original file
    original_path = document_processor.get_file_path(file_id)
    if original_path and os.path.exists(original_path):
        return FileResponse(
            original_path,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            filename=f"document.docx",
        )

    raise HTTPException(status_code=404, detail="Document not found")


@router.delete("/document/{file_id}")
async def delete_document(file_id: str):
    """Delete a document"""

    try:
        document_processor.delete_file(file_id)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to delete document: {str(e)}"
        )

    return {"message": "Document deleted successfully"}
