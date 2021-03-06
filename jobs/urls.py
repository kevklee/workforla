from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^search/?$', views.search, name='search'),
    url(r'^(?P<job_alias>[a-z-]+)', views.details, name='details'),
    url(r'^', views.index, name='index')
]
