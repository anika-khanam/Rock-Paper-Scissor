from django.contrib import admin
<<<<<<< HEAD
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('', include('RPS.urls')),

]
=======
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('RPS.urls')),
]
>>>>>>> 8fe946c00ae4d4718a536946f46316c9482d8cbe
