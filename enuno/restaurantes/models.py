from django.db import models
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _


class Corp(models.Model):
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
    razon_social_validator = RegexValidator(
        regex=r"^[a-zA-Z\s.,&()-]+$",
        message="La Razón Social debe contener solo letras, espacios, puntos, comas, ampersands, guiones y paréntesis",
        code="invalid_razon_social",
    )

    razon_social = models.CharField(
        max_length=56,
        validators=[razon_social_validator],
        null=False,
        blank=False,
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
    user = models.CharField(
        max_length=18,
        unique=True,
        null=False,
        blank=False,
        editable=False,
    )
    contrasena = models.CharField(
        max_length=18,
        unique=True,
        null=False,
        blank=False,
    )
    membresia = models.DateField(
        null=False,
        blank=False,
    )

    def save(self, *args, **kwargs):
        if self.pk:
            self.user = f"{self.nombre[:4].lower()}{self.dni[:4]}.admin"
        else:
            self.user = f"{self.nombre[:4].lower()}{self.dni[:4]}.admin"
        self.razon_social = self.razon_social.lower()
        self.nombre = self.nombre.lower()
        self.apellido = self.apellido.lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.user
