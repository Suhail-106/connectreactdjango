import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getProducts(request):
    limit = request.GET.get('limit', 30)
    skip = request.GET.get('skip', 0)

    url = f"https://dummyjson.com/products?limit={limit}&skip={skip}"

    try:
        response = requests.get(url)
        data = response.json()
        return Response(data)

    except Exception as e:
        return Response({"error": str(e)})


