# MongoDB Template DB - Docker Swarm Deployment

Configuración para desplegar una base de datos MongoDB con una interfaz web (`mongo-express`) en un servidor VPS usando Docker Swarm, Caddy y CI/CD automático.

## 🚀 Características

- **MongoDB 7.0**: Base de datos NoSQL.
- **Mongo-Express**: Interfaz de administración web para MongoDB.
- **Docker Swarm**: Orquestación de contenedores.
- **CI/CD automático**: Despliegue continuo con GitHub Actions.
- **Caddy Server**: Proxy reverso automático con HTTPS.

## 📋 Prerrequisitos

- Servidor VPS con Docker y Docker Swarm inicializado.
- Un dominio apuntando a la IP de tu VPS.
- Caddy configurado para funcionar con Docker Swarm labels.
- Acceso SSH a tu servidor.

## 🛠️ Configuración

### 1. Configurar GitHub Secrets

Ve a `Settings > Secrets and variables > Actions` en tu repositorio y añade los siguientes secrets:

**Conexión SSH:**
- `SSH_PRIVATE_KEY`: Tu clave SSH privada para acceder al VPS.
- `VPS_HOST`: La IP o dominio de tu VPS.
- `VPS_USER`: El usuario SSH para tu VPS.

**Base de Datos (MongoDB):**
- `MONGO_ROOT_USERNAME`: El usuario administrador para la base de datos.
- `MONGO_ROOT_PASSWORD`: La contraseña para el usuario administrador de la DB.
- `MONGO_DATABASE`: El nombre de la base de datos a crear.

**Interfaz Web (Mongo-Express):**
- `MONGO_EXPRESS_USERNAME`: El usuario para acceder a la interfaz web.
- `MONGO_EXPRESS_PASSWORD`: La contraseña para la interfaz web.

**Dominio (Caddy):**
- `DOMAIN`: Tu dominio base (ej. `saguarodrap.dev`).
- `CADDY_EMAIL`: Tu email para generar los certificados SSL.

## 🚀 Despliegue

1.  Asegúrate de haber configurado todos los secrets.
2.  Haz `git push` a la rama `main`.

El workflow de GitHub Actions se activará, construirá la configuración en tu VPS y desplegará los servicios.

### ¿Qué ocurre durante el despliegue?
1.  **GitHub Actions** se conecta a tu VPS.
2.  Copia el archivo `deploy-stack.yml`.
3.  Crea un archivo `.env` con los valores de tus secrets.
4.  **Docker Swarm** lee la configuración y levanta los servicios `mongodb` y `mongo-express`.
5.  **Caddy** detecta las `labels` del servicio `mongo-express` y automáticamente configura un proxy reverso con HTTPS.

## 🌐 Acceso

-   **Interfaz Web**: Podrás acceder a través de `https://db.TU_DOMINIO` (ej. `https://db.saguarodrap.dev`). Usa las credenciales de `MONGO_EXPRESS_USERNAME` y `MONGO_EXPRESS_PASSWORD` para entrar.
-   **Base de Datos**: La base de datos **no está expuesta directamente a internet**. Solo es accesible desde otros contenedores dentro de la misma red de Docker, como `mongo-express` o tus propias aplicaciones si las conectas a la red `mongodb_network`.

## 📝 Estructura del Proyecto

```
.
├── .deploy/
│   └── deploy-stack.yml  # Define los servicios mongodb y mongo-express
└── .github/
    └── workflows/
        └── deploy.yml      # Workflow de despliegue automático
```

## 📊 Monitoreo

```bash
# Ver servicios
docker service ls

# Ver logs
docker service logs mongodb_mongodb

# Ver estadísticas
docker stats
```

## 🌐 Conexión

```javascript
// Ejemplo de conexión con Node.js
const { MongoClient } = require('mongodb');

const uri = "mongodb://admin:tu_password@db.tu-dominio.com:27017/tu_database";
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error de conexión:", error);
    }
}
```

## 🛠️ Mantenimiento

```bash
# Actualizar servicio
docker service update mongodb_mongodb

# Ver logs detallados
docker service logs mongodb_mongodb --tail 100 -f
```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Abre un nuevo issue con detalles del problema 