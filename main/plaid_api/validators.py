from rest_framework.serializers import ValidationError
from . import is_institution_exists

# Insure to store only one access token by institution
class UniqueInstitutionValidator:
    message = "This institution is already linked."

    def __init__(self, queryset: list):
        self.queryset = queryset
        self.access_tokens = list(
            map(
                lambda obj: obj.access_token,
                queryset 
            ))

    def __call__(self, value):
        if is_institution_exists(self.access_tokens, value):
            raise ValidationError(self.message)
