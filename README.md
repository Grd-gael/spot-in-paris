# spot-in-paris

SpotInParis est une application web permettant de trouver facilement des événements culturels et ludiques à Paris

- HTML
- CSS (Bootstrap)
- JS

Appel de l'API Que faire à Paris : https://opendata.paris.fr/explore/dataset/que-faire-a-paris-/information

# Pour lancer un container avec docker

cd spotinparis
-> d'abord se déplacer dans la racine du projet

docker build -t spotinparis .
-> Créer l'image spotinparis et de copier tous les fichiers du dossier courant

docker run -p 8080:80 spotinparis
-> Lancer un conteneur avec l'image spotinparis sur le port 80

http://localhost:8080
