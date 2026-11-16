# Library Management - Full Stack K8S

Application full-stack de gestion de bibliothèque déployée sur un cluster K3S.

## Architecture

| Service | Tech | Base de données |
|---|---|---|
| Frontend | React + Vite + Nginx | - |
| MS1 - Books | Node.js + Express | MongoDB (NoSQL) |
| MS2 - Users | Node.js + Express | PostgreSQL (SQL) |
| MS3 - Loans | Node.js + Express | PostgreSQL (SQL) |

## Prérequis

- Docker Desktop
- Node.js 24+
- K3D (K3S dans Docker)
- kubectl
- Helm

## Lancement local

\\\ash
docker compose up --build
\\\

## Déploiement K3S

\\\ash
k3d cluster create library-cluster --port "8080:80@loadbalancer" --agents 1
kubectl apply -k k8s/overlays/dev
\\\

## Auteur

Ghazi Arif
