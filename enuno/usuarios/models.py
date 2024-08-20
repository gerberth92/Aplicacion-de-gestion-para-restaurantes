from django.db import models
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _


class Usuarios(models.Model):
    alpha_validator = RegexValidator(
        regex=r"^[a-zA-Z]+$",
        message=_("No se permiten espacios ni caracteres no alfabéticos"),
        code="invalid_alpha",
    )
    dni_validator = RegexValidator(
        regex=r"^\d{8}$",
        message=_("El DNI debe contener exactamente 8 dígitos"),
        code="invalid_dni",
    )
    nombre = models.CharField(
        max_length=10,
        validators=[alpha_validator],
        null=False,
        blank=False,
    )
    apellido = models.CharField(
        max_length=10,
        validators=[alpha_validator],
        null=False,
        blank=False,
    )
    dni = models.CharField(
        max_length=8,
        validators=[dni_validator],
        unique=True,
        null=False,
        blank=False,
    )
    puesto = models.CharField(
        max_length=8,
        null=False,
        blank=False,
    )
    user = models.CharField(
        max_length=18,
        unique=True,
        null=False,
        blank=False,
        editable=False,
    )
    cont = models.CharField(
        max_length=18,
        unique=True,
        null=False,
        blank=False,
    )

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user = f"{self.nombre[:4].lower()}{self.dni}.{self.puesto}"
        self.nombre = self.nombre.lower()
        self.apellido = self.apellido.lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.user