from uuid import UUID

from pydantic import BaseModel
from typing import Optional


class Todo(BaseModel):
    uuid: Optional[UUID]
    title: str
    body: Optional[str]
