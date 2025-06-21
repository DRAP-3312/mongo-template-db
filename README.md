# MongoDB Template DB - Docker Swarm Deployment

Configuración mínima para desplegar MongoDB en un servidor VPS usando Docker Swarm y Caddy.

## 🚀 Características

- **MongoDB 7.0** con configuración básica
- **Docker Swarm** para orquestación
- **CI/CD automático** con GitHub Actions
- **Configuración automática de Caddy** mediante labels

## 📋 Prerrequisitos

- Servidor VPS con Docker Swarm configurado
- Caddy configurado con Docker Swarm labels
- Acceso SSH al servidor
- Dominio configurado para Caddy

## 🛠️ Configuración

### 1. Configurar GitHub Secrets

Configura los siguientes secrets en tu repositorio de GitHub:

- `SSH_PRIVATE_KEY`: Tu clave SSH privada
- `VPS_HOST`: IP o dominio de tu servidor
- `VPS_USER`: Usuario SSH del servidor
- `MONGO_ROOT_USERNAME`: Usuario root de MongoDB
- `MONGO_ROOT_PASSWORD`: Contraseña root de MongoDB
- `MONGO_DATABASE`: Nombre de la base de datos
- `DOMAIN`: Tu dominio principal (ej: saguarodrap.dev)
- `CADDY_EMAIL`: Email para certificados SSL

## 🚀 Despliegue

El despliegue automático se activa al hacer push a la rama `main` o `master`.

### Flujo de despliegue:
1. **GitHub Actions** copia el archivo de configuración al servidor
2. **Docker Swarm** despliega MongoDB
3. **Caddy** detecta automáticamente los labels y configura el proxy reverso
4. **MongoDB** estará disponible en `db.tu-dominio.com:27017`

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| `MONGO_ROOT_USERNAME` | Usuario root de MongoDB |
| `MONGO_ROOT_PASSWORD` | Contraseña root de MongoDB |
| `MONGO_DATABASE` | Base de datos inicial |
| `DOMAIN` | Dominio principal |
| `CADDY_EMAIL` | Email para SSL |

### Acceso

- **MongoDB**: `mongodb://usuario:password@db.tu-dominio.com:27017/tu_database`

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

## 📝 Estructura del Proyecto

```
mongo-template-db/
├── .deploy/
│   └── deploy-stack.yml          # Stack de Docker Swarm
├── .github/workflows/
│   └── deploy.yml                # Workflow de GitHub Actions
└── README.md                     # Documentación
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