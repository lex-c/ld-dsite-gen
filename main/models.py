from django.db import models
from django.forms import ModelForm
from django.contrib import admin
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.



class Pic(models.Model):
    pic_name = models.TextField(max_length=2083)
    description = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.description}'

class PicForm(ModelForm):
    class Meta:
        model = Pic
        fields = ['pic_name', 'description']

class Tag(models.Model):
    tag_name = models.CharField(max_length=200)
    intensity = models.PositiveIntegerField(default=100, validators=[MinValueValidator(1), MaxValueValidator(100)])
    pics = models.ForeignKey('Pic', on_delete=models.CASCADE,)

    def __str__(self):
        return f'{self.tag_name}'
# choices=[('latex', 'latex'), ('corporal', 'corporal'), ('cbt', 'cbt'), ('pain', 'pain'), ('legs', 'legs'), ('whips', 'whips'), ('leather', 'leather'), ('butt', 'butt'), ('boots', 'boots'), ('mommy', 'mommy'), ('nurse', 'nurse'),])