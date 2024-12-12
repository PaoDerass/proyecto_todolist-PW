import React from "react";

const Producto = ({
  tareas,
  eliminarTarea,
  eliminarTareasMultiples,
  actualizarTarea,
  cambiarEstadoTarea,
  tareasSeleccionadas,
  setTareasSeleccionadas,
  obtenerColorEstado,
}) => {
  const manejarSeleccionarTarea = (id) => {
    setTareasSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  return (
    <div className="task-list">
      {tareas.map((tarea) => (
        <div
          key={tarea.id}
          className="task"
          style={{ backgroundColor: obtenerColorEstado(tarea.status) }}
        >
           
          <input
            type="checkbox"
            checked={tareasSeleccionadas.includes(tarea.id)}
            onChange={() => manejarSeleccionarTarea(tarea.id)}
          />
          <span>{tarea.title}</span>
          <button onClick={() => cambiarEstadoTarea(tarea.id)}>Cambiar Estado</button>
          <button onClick={() => eliminarTarea(tarea.id)}>Borrar Tarea</button>

          {}
          <i className="fas fa-paw"></i>
        </div>
      ))}
    </div>
  );
};

export default Producto;