from rest_framework import serializers
# from .models import (models)

class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        # model= Home
        fields= '__all__'
    