
class AppException(Exception):
    status_code: int = 400
    default_message: str = "Bad request"

    def __init__(self, message: str | None = None):
        self.message = (
            message if message is not None else self.default_message
        )
        super().__init__(self.message)


class NotFoundException(AppException):
    status_code = 404
    default_message = "Resource not found"

    def __init__(
        self,
        resource: str = "Resource",
        key: str | None = None,
        value: str | int | None = None,
    ):
        message = f"{resource} not found"

        if key is not None and value is not None:
            message = f"{resource} with {key} '{value}' not found"

        super().__init__(message)


class ConflictException(AppException):
    status_code = 409
    default_message = "Resource already exists"

    def __init__(
        self,
        resource: str = "Resource",
        key: str | None = None,
        value: str | int | None = None,
    ):
        message = f"{resource} already exists"

        if key is not None and value is not None:
            message = f"{resource} with {key} '{value}' already exists"

        super().__init__(message)


class UnauthorizedException(AppException):
    status_code = 401
    default_message = "Unauthorized"


class ForbiddenException(AppException):
    status_code = 403
    default_message = "Forbidden"


class ServiceUnavailableException(AppException):
    status_code = 503
    default_message = "Service unavailable"
