from django.db import models
from django.forms import ModelForm
from django.contrib import admin
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.files.uploadhandler import FileUploadHandler
from django.core.files.uploadedfile import UploadedFile
from django.conf import settings
# need to update to django.db.models.JSONField
from django.contrib.postgres.fields import JSONField
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

# class FBFileUpload(FileUploadHandler):
#     def receive_data_chunk(self, raw_data, start):
#         return raw_data
#     def file_complete(file, file_size):
#         return UploadedFile(file=file, name='images', content_type='image/jpeg', size=file_size)
# does not work

class UserInterestDF(models.Model):
    user_df = JSONField(encoder=None)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )



    