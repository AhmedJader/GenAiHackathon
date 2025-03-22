# schema!!
from typing import List

from pydantic import parse_obj_as
from pydantic import TypeAdapter

from src.users.models import User

stupid_schema = [
    {"id": 1,
     "name": "First Dude"
     },
    {"id": 2,
     "name": "Second Dude"
     },
    {"id": 3,
     "name": "Third Dude"
     },
]

ta = TypeAdapter(List[User])
a = ta.validate_python(stupid_schema)



