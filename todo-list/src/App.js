import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Howl } from "howler";
import axios from "./hook/useProducto"; // configuración de Axios
import "./App.css";
import Campo from "./components/Campo";
import Producto from "./components/Producto";

// Sonidos
const addSound = new Howl({ src: ["/sounds/add.mp3"] });
const deleteSound = new Howl({ src: ["/sounds/delete.mp3"] });
const updateSound = new Howl({ src: ["/sounds/update.mp3"] });

const App = () => {
  const [tareas, setTareas] = useState([]);
  const [tareasSeleccionadas, setTareasSeleccionadas] = useState([]); // Para tareas seleccionadas

  // Cargar tareas desde localStorage al iniciar la app
  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const tareasGuardadas = localStorage.getItem("tasks");
        if (tareasGuardadas) {
          setTareas(JSON.parse(tareasGuardadas)); 
        } else {
          setTareas([]); 
        }
      } catch (error) {
        console.error("Error al cargar las tareas", error);
      }
    };
  
    cargarTareas();
  }, []);

  // Agregar tarea al estado y a localStorage
  const agregarTarea = (titulo) => {
    const nuevaTarea = { id: Date.now(), title: titulo, status: "Por Hacer" }; // Estado por defecto: "Por Hacer"
    setTareas([...tareas, nuevaTarea]);
  
    // Actualizar localStorage
    localStorage.setItem("tasks", JSON.stringify([...tareas, nuevaTarea]));
  
    // SweetAlert y sonido para agregar tarea
    Swal.fire({
      title: "¡Tarea agregada!",
      text: `Se ha agregado: "${titulo}"`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
    addSound.play();
  };

  // Eliminar tarea y actualizar el estado
  const eliminarTarea = (id) => {
    const tarea = tareas.find((task) => task.id === id);
    const tareasActualizadas = tareas.filter((task) => task.id !== id);
    setTareas(tareasActualizadas);
  
    // Actualizar localStorage
    localStorage.setItem("tasks", JSON.stringify(tareasActualizadas));
  
    // SweetAlert y sonido para eliminar tarea
    Swal.fire({
      title: "¡Tarea eliminada!",
      text: `Se ha eliminado: "${tarea.title}"`,
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
    });
    deleteSound.play();
  };

  // Eliminar múltiples tareas
  const eliminarTareasMultiples = async () => {
    try {
      await Promise.all(tareasSeleccionadas.map((id) => axios.delete(`/todos/${id}`)));
  
      const tareasRestantes = tareas.filter((task) => !tareasSeleccionadas.includes(task.id));
  
      setTareas(tareasRestantes);
  
      localStorage.setItem("tareas", JSON.stringify(tareasRestantes));
  
      Swal.fire({
        title: "Tareas eliminadas",
        text: `${tareasSeleccionadas.length} tareas fueron eliminadas.`,
        icon: "warning",
        timer: 1500,
        showConfirmButton: false,
      });
  
      setTareasSeleccionadas([]);
  
      deleteSound.play();
    } catch (error) {
      console.error("Error al eliminar tareas:", error);
    }
  };

  // Cambiar estado de una tarea
  const cambiarEstadoTarea = async (id) => {
    const tarea = tareas.find((task) => task.id === id);
    const estado = await Swal.fire({
      title: "Selecciona el estado",
      input: "select",
      inputOptions: {
        "Por hacer": "Por hacer",
        "En progreso": "En progreso",
        "Finalizada": "Finalizada",
      },
      inputPlaceholder: "Selecciona un estado",
      showCancelButton: true,
      confirmButtonText: "Cambiar",
    });

    if (estado.isConfirmed) {
      const tareaActualizada = { ...tarea, status: estado.value };
      await actualizarTarea(id, tareaActualizada);
    }
  };

  // Actualizar tarea en el estado y en localStorage
  const actualizarTarea = (id, tareaActualizada) => {
    const tareasActualizadas = tareas.map((task) =>
      task.id === id ? tareaActualizada : task
    );
    setTareas(tareasActualizadas);
  
    // Actualizar localStorage
    localStorage.setItem("tasks", JSON.stringify(tareasActualizadas));
  
    // SweetAlert y sonido para actualizar tarea
    Swal.fire({
      title: "¡Tarea actualizada!",
      text: `Estado cambiado a: "${tareaActualizada.status}"`,
      icon: "info",
      timer: 1500,
      showConfirmButton: false,
    });
    updateSound.play();
  };

  // Cambiar color de las tareas según su estado
  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case "Por hacer":
        return "pink";
      case "En progreso":
        return "red";
      case "Finalizada":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="App">
      <h1>Lista de Tareas</h1>
      <Campo agregarTarea={agregarTarea} />
      <div>
        <button onClick={eliminarTareasMultiples} disabled={tareasSeleccionadas.length === 0}>
          Eliminar Tareas Seleccionadas
        </button>
      </div>
      <Producto
        tareas={tareas}
        eliminarTarea={eliminarTarea}
        eliminarTareasMultiples={eliminarTareasMultiples}
        actualizarTarea={actualizarTarea}
        cambiarEstadoTarea={cambiarEstadoTarea}
        tareasSeleccionadas={tareasSeleccionadas}
        setTareasSeleccionadas={setTareasSeleccionadas}
        obtenerColorEstado={obtenerColorEstado}
      />
    </div>
  );
};

export default App;