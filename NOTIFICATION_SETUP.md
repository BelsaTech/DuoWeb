# 📧 Guía de Notificaciones con Resend

Esta guía te explica cómo enviar notificaciones a tus suscriptores cuando tu app esté lista usando **Resend** (emails transaccionales que llegan a la bandeja principal).

## 🚀 Configuración Inicial

### 1. Crear cuenta en Resend

1. Ve a https://resend.com
2. Regístrate con tu email
3. Verifica tu email

### 2. Obtener API Key

1. Ve a https://resend.com/api-keys
2. Haz clic en "Create API Key"
3. Dale un nombre (ej: "DuoMind Notifications")
4. Copia la API key

### 3. Configurar dominio (OPCIONAL pero recomendado)

Para que los emails se vean más profesionales y tengan mejor entregabilidad:

1. Ve a https://resend.com/domains
2. Haz clic en "Add Domain"
3. Ingresa tu dominio (ej: `duomind.app`)
4. Sigue las instrucciones para agregar los registros DNS
5. Una vez verificado, podrás enviar desde `notifications@duomind.app`

**Si no tienes dominio:** Puedes usar el dominio de prueba de Resend (`onboarding@resend.dev`) pero los emails tendrán menor entregabilidad.

### 4. Configurar Variables de Entorno en Vercel

Ve a tu proyecto en Vercel → Settings → Environment Variables y agrega:

```
RESEND_API_KEY = tu_api_key_de_resend
NOTIFICATION_SECRET = un_string_aleatorio_seguro (ej: abc123xyz789)
PLAY_STORE_URL = https://play.google.com/store/apps/details?id=com.tuapp
```

**Para todas las variables, selecciona:** Production, Preview y Development

### 5. Generar un secret aleatorio

Puedes generar un secret seguro con:

**En Linux/Mac:**
```bash
openssl rand -hex 32
```

**O simplemente inventa uno largo y aleatorio:**
```
mi_super_secreto_DuoMind_2024_xyz123
```

### 6. Actualizar el dominio en el código

Edita el archivo `api/send-notification.ts` línea 42:

```typescript
from: 'DuoMind <notifications@tudominio.com>', // Cambiar por tu dominio
```

Si no tienes dominio, usa:
```typescript
from: 'DuoMind <onboarding@resend.dev>',
```

### 7. Deploy a Vercel

```bash
git add .
git commit -m "Add Resend notification system"
git push origin main
```

Vercel desplegará automáticamente.

## 📨 Cómo Enviar la Notificación

### Opción 1: Usando el script automático (RECOMENDADO)

El script obtiene automáticamente todos los suscriptores de MailerLite y les envía el email:

```bash
# En tu computadora local, asegúrate de tener las variables de entorno configuradas
node scripts/send-launch-notification.js
```

El script:
1. Obtiene todos los emails de MailerLite
2. Te muestra cuántos suscriptores hay
3. Te da 5 segundos para cancelar
4. Envía los emails via Resend
5. Te muestra las estadísticas

### Opción 2: Usando la API directamente

Puedes hacer una petición POST a tu API de Vercel:

```bash
curl -X POST https://tu-dominio.vercel.app/api/send-notification \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "tu_notification_secret",
    "emails": ["email1@example.com", "email2@example.com"],
    "playStoreUrl": "https://play.google.com/store/apps/details?id=com.tuapp"
  }'
```

### Opción 3: Desde Postman o Insomnia

Crea una petición POST con:

- **URL:** `https://tu-dominio.vercel.app/api/send-notification`
- **Method:** POST
- **Headers:**
  - `Content-Type: application/json`
- **Body:**
```json
{
  "secret": "tu_notification_secret",
  "emails": [
    "usuario1@gmail.com",
    "usuario2@gmail.com"
  ],
  "playStoreUrl": "https://play.google.com/store/apps/details?id=com.duomind"
}
```

## ✅ Ventajas de usar Resend

| Característica | MailerLite (Campañas) | Resend (Transaccional) |
|----------------|----------------------|------------------------|
| **Llega a inbox** | ❌ Promociones/Spam | ✅ Bandeja principal |
| **Hace sonido** | ❌ No suena | ✅ Gmail hace sonido |
| **Tipo de email** | Marketing | Transaccional/Importante |
| **Tasa de apertura** | ~15-20% | ~40-60% |
| **Gratis hasta** | 1,000 suscriptores | 3,000 emails/mes |

## 🔍 Verificar que funciona

Después de configurar todo:

1. Envía un email de prueba a ti mismo
2. Revisa tu Gmail - debe llegar a la **Bandeja de entrada principal**
3. Debe hacer el sonido de notificación de Gmail
4. Si llega a Promociones, verifica que configuraste bien el dominio

## 🛟 Solución de Problemas

**Error: "RESEND_API_KEY is not set"**
- Verifica que agregaste la variable en Vercel
- Haz redeploy después de agregar las variables

**Emails llegan a Spam:**
- Configura un dominio personalizado en Resend
- Verifica los registros DNS (SPF, DKIM)
- Usa un dominio verificado

**Error 401 Unauthorized:**
- Verifica que el `NOTIFICATION_SECRET` sea correcto
- Debe ser el mismo en el script y en Vercel

## 💡 Consejos

- **Prueba primero:** Envía emails de prueba a ti mismo antes del lanzamiento
- **Personaliza el email:** Edita el HTML en `api/send-notification.ts`
- **Monitorea:** Revisa las estadísticas en https://resend.com/emails
- **Timing:** Envía las notificaciones en horarios óptimos (10am-2pm)

## 📊 Próximos pasos después del envío

1. Monitorea las estadísticas en Resend dashboard
2. Revisa cuántos emails fueron entregados
3. Ve la tasa de apertura y clics
4. Responde a cualquier email que recibas

---

¿Necesitas ayuda? Revisa la documentación de Resend: https://resend.com/docs
