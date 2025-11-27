/**
 * Script de PRUEBA para enviar UNA notificación a tu email
 *
 * Usage:
 *   node scripts/test-notification.js tu@email.com
 */

const NOTIFICATION_SECRET = process.env.NOTIFICATION_SECRET || 'DuoMind1109';
const VERCEL_URL = process.env.VERCEL_URL || 'https://duo-web.vercel.app'; // Cambia por tu URL de Vercel
const testEmail = process.argv[2];

if (!testEmail) {
  console.error('❌ Error: Debes proporcionar un email');
  console.log('\nUso: node scripts/test-notification.js tu@email.com');
  console.log('Ejemplo: node scripts/test-notification.js juan@gmail.com\n');
  process.exit(1);
}

async function sendTestEmail() {
  console.log('🧪 Enviando email de prueba...');
  console.log(`   Para: ${testEmail}`);
  console.log(`   API: ${VERCEL_URL}/api/send-notification\n`);

  try {
    const response = await fetch(`${VERCEL_URL}/api/send-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: NOTIFICATION_SECRET,
        emails: [testEmail],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error ${response.status}: ${error}`);
    }

    const result = await response.json();

    console.log('✅ ¡Email enviado exitosamente!');
    console.log('\n📊 Resultados:');
    console.log(`   - Total: ${result.stats.total}`);
    console.log(`   - Exitosos: ${result.stats.successful}`);
    console.log(`   - Fallidos: ${result.stats.failed}`);
    console.log('\n📬 Revisa tu bandeja de entrada (o spam si no lo ves)\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Posibles causas:');
    console.log('   - RESEND_API_KEY no configurado en Vercel');
    console.log('   - NOTIFICATION_SECRET incorrecto');
    console.log('   - URL de Vercel incorrecta');
    console.log('   - Vercel aún no terminó el deploy\n');
    process.exit(1);
  }
}

sendTestEmail();
