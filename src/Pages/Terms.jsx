export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-slate-700 space-y-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Términos de Uso</h1>

      <p>
        Al usar <strong>FamilyApp</strong>, aceptas hacerlo de forma responsable. La aplicación se ofrece “tal cual”,
        sin garantías, con el objetivo de ayudarte a gestionar tus finanzas personales o profesionales.
      </p>

      <p>
        El contenido introducido por el usuario es responsabilidad exclusiva del mismo. 
        <strong> FamilyApp</strong> no se hace responsable de pérdidas de datos ocasionadas por mal uso,
        errores externos o causas ajenas al servicio.
      </p>

      <p>
        Nos reservamos el derecho de actualizar o mejorar la aplicación sin previo aviso, manteniendo siempre la transparencia con los usuarios.
      </p>

      <p>Si tienes dudas, puedes contactarnos en{" "}
        <a href="mailto:soporte@familyapp.store" className="text-sky-600 hover:underline">
          soporte@familyapp.store
        </a>.
      </p>
    </div>
  );
}
