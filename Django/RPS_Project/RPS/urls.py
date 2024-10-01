from django.urls import path
from .views import RegisterView, CheckUserView, guest_view
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),  
    path('loggedin/', CheckUserView.as_view(), name='loggedin'), 
    path('guest/', guest_view, name='guest'), 
]
