from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

def generate_image(prompt):
    api_url = "https://prompt.glitchy.workers.dev/gen"
    params = {
        "key": prompt,
        "t": 0.2,
        "f": "dalle3",
        "demo": "true",
        "count": 1
    }

    try:
        response = requests.get(api_url, params=params)
        data = response.json()

        if data["status"] == 1 and "images" in data:
            image_url = data["images"][0]["imagedemo1"][0]
            return image_url
        return None

    except Exception as e:
        print(f"Hata: {str(e)}")
        return None

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    prompt = request.form.get('prompt')
    image_url = generate_image(prompt)
    if image_url:
        return jsonify({'success': True, 'image_url': image_url})
    return jsonify({'success': False})

if __name__ == '__main__':
    app.run(debug=True)