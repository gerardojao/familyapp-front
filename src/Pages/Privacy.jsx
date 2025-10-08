export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-slate-700 space-y-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Política de Privacidad</h1>

      <p>
        En <strong>FamilyApp</strong> valoramos tu privacidad. Los datos que registras en la aplicación
        (como ingresos, gastos o correo electrónico) se almacenan de forma segura y nunca se comparten con terceros.
      </p>

      <p>
        Usamos tu correo únicamente para funciones dentro de la app, como recuperación de contraseña o avisos importantes.
        No enviamos publicidad ni cedemos información a otras empresas.
      </p>

      <p>
        Puedes solicitar la eliminación de tu cuenta y tus datos escribiendo a{" "}
        <a href="mailto:soporte@familyapp.store" className="text-sky-600 hover:underline">
          soporte@familyapp.store
        </a>.
      </p>

      <p>Última actualización: {new Date().toLocaleDateString("es-ES")}</p>
    </div>
  );
}
