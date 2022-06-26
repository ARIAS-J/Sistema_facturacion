from urllib import response
from django.shortcuts import render

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import HomeSerializer
# from .models import (Models)

class Home(APIView):
    def get(self, request):
        
        # model = model.objects.all()
        # serializer = HomeSerializer(model, context={"request": request}, many=True)
        return Response()