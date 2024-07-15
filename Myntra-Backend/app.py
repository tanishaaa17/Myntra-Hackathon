from flask import Flask, request, jsonify, send_file, send_from_directory, render_template
from flask_sqlalchemy import SQLAlchemy
from io import BytesIO
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///images.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    data = db.Column(db.LargeBinary)
    likes = db.Column(db.Integer, default=0)
    tag = db.Column(db.String(50))  # New column for tags

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    tag = request.form.get('tag', '')  # Ensure tag is retrieved from form data

    new_image = Image(name=image.filename, data=image.read(), tag=tag)
    db.session.add(new_image)
    db.session.commit()

    return jsonify({'message': 'Image uploaded successfully'}), 201

@app.route('/images/<int:image_id>', methods=['GET'])
def get_image(image_id):
    image = Image.query.get_or_404(image_id)
    return send_file(BytesIO(image.data), mimetype='image/jpeg', as_attachment=False, download_name=image.name)

@app.route('/like/<int:image_id>', methods=['POST'])
def like_image(image_id):
    image = Image.query.get(image_id)

    if image:
        if image.likes is None:
            image.likes = 1
        else:
            image.likes += 1

        db.session.commit()
        return jsonify({'message': 'Image liked successfully', 'likes': image.likes}), 200
    else:
        return jsonify({'error': 'Image not found'}), 404

@app.route('/gallery', methods=['GET'])
def gallery():
    images = Image.query.all()
    image_list = [{'id': image.id, 'name': image.name, 'src': f"/images/{image.id}", 'likes': image.likes, 'tag': image.tag} for image in images]
    return jsonify(image_list)

@app.route('/gallery/sorted', methods=['GET'])
def gallery_sorted():
    images = Image.query.order_by(Image.likes.desc()).all()
    image_list = [{'id': image.id, 'name': image.name, 'src': f"/images/{image.id}", 'likes': image.likes, 'tag': image.tag} for image in images]
    return jsonify(image_list)

@app.route('/likes/<int:image_id>', methods=['GET'])
def get_likes(image_id):
    image = Image.query.get_or_404(image_id)
    return jsonify({'likes': image.likes})

@app.route('/images/<int:image_id>', methods=['DELETE'])
def delete_image(image_id):
    image = Image.query.get(image_id)
    if image:
        db.session.delete(image)
        db.session.commit()
        return jsonify({'message': 'Image deleted successfully'}), 200
    else:
        return jsonify({'error': 'Image not found'}), 404

# Serve static files for React
@app.route('/static/<path:path>')
def static_files(path):
    return send_from_directory(os.path.join('build', 'static'), path)

if __name__ == '__main__':
    app.run(debug=True)
