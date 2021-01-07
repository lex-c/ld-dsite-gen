from django.contrib import admin
from .models import Pic, Tag

# Register your models here.


class PicTagsInline(admin.TabularInline):
    model = Pic.tags.through
    extra = 1

class PicAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('firebase_id', 'description')
        }),
    )
    inlines = (PicTagsInline,)

admin.site.register(Tag)
admin.site.register(Pic, PicAdmin)


