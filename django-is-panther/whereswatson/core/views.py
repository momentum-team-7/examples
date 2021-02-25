from django.shortcuts import render

from .models import Answer

# Create your views here.

def get_info_from_pretend_api():
    return True

def index(request):
    if not get_info_from_pretend_api():
        answer = Answer.objects.get(text='NO')
    else: 
        answer = Answer.objects.get(text='YES')
    return  render(request, 'core/index.html', {'answer': answer})
