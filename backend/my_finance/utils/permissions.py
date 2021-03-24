from rest_framework import permissions
from django.contrib.contenttypes.models import ContentType


class GETRequestNotAllowed(permissions.BasePermission):
    # Prevent Get request method to success in the vieset
    def has_permission(self, request, view):
        if request.method == 'GET':
            return False
        return True


class CanRetreive(permissions.BasePermission):
    message = "You are not allowed to retrieve transactions"

    def has_permission(self, request, view):
        # Authenticate user can only retreive entry/ies related to him/her
        if request.method == "GET":
            if request.user.pk == view.kwargs.get('user_id'):
                return True
        return False


class CanCreate(permissions.BasePermission):
    message = "You are not allowed to add transactions"

    def has_permission(self, request, view):
        # Authenticate user can only create entry related to him/her
        if request.method == "POST":
            if request.user.pk != request.data.get('user'):
                return False
        return True


class CanUpdate(permissions.BasePermission):
    message = "You are not allowed to update transactions"

    def has_permission(self, request, view):
        # Authenticate user can only update entry related to him/her
        if request.method == "PUT" and not is_object_owner(request, view):
            return False
        return True


class CanDelete(permissions.BasePermission):
    message = "You are not allowed to delete transactions"

    def has_permission(self, request, view):
        # Authenticate user can only delete entry related to him/her
        if request.method == "DELETE" and not is_object_owner(request, view):
            return False
        return True


def is_object_owner(request, view):
    # check if the authenticated user is the owner of the specified row
    try:
        # get model from view serializer
        model = view.serializer_class.Meta.model
        # retreive entry that to be updated
        obj = model.objects.get(pk=view.kwargs.get(
            'pk'), user_id=request.user.pk)

        if obj and request.method == "PUT":
            # user reference cannot be updated
            if (request.data.get('user') == request.user.pk) and request.data.get('id') == int(view.kwargs.get('pk')):
                return True
            else:
                return False
        elif obj and request.method == "DELETE":
            return True
        else:
            return False
    except Exception as e:
        return False
