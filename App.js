import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast,} from "react-toastify";


function App() {
  const [animal_type, setAnimal_type] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [animal_size, setAnimal_size] = useState(0);
  const [common_color, setCommon_color] = useState("");
  const [animal_managementlist, setAnimal_managementlist] = useState([]);
  const [newanimal_size, setNewAnimal_size] = useState(0);

  
 const add = () => {
  toast.success('Values Added')
 };
 const show = () => {
  toast.success('Values updated')

 }
 const deleted = () => {
  toast.success('Values Deleted')

 }
  const addAnimal_management = () => {
    axios
      .post("http://localhost:5700/create", {
        animal_type: animal_type,
        breed: breed,
        color: color,
        animal_size: animal_size,
        common_color: common_color,
      })
      .then(() => {
        setAnimal_managementlist([
          ...animal_managementlist,
          {
            animal_type: animal_type,
            breed: breed,
            color: color,
            animal_size: animal_size,
            common_color: common_color,
          },
        ]);
      });
  };
  const getAnimal_management = () => {
    axios.get("http://localhost:5700/animal_management").then((response) => {
      setAnimal_managementlist(response.data);
    });
  };

  const updateAnimal_management = (id) => {
    axios
      .put("http://localhost:5700/update", {
        animal_size: newanimal_size,
        id: id,
      })
      .then((response) => {
        setAnimal_managementlist(
          animal_managementlist.map((animal) => {
            return animal.id == id
              ? {
                  id: animal.id,
                  name: animal.animal_type,
                  country: animal.breed,
                  age: animal.color,
                  animal_size: newanimal_size,
                  common_color: animal.common_color,
                }
              : animal;
          })
        );
      });
  };
       const deleteAnimal_management = (id) => {
         axios.delete(`http://localhost:5700/delete/${id}`).then((response) => {
      setAnimal_managementlist(
        animal_managementlist.filter((animal) => {
          return animal.id != id;
        })
      );
    });
  };
   
  return (
    <div className="combine">
      <div className="information">
        <h1>Animal Management System</h1>
        <form className="form" onSubmit={addAnimal_management}>
          <label>Animal Type</label>
          <input
            type="text"
            animal_type="animal_type"
            onChange={(e) => setAnimal_type(e.target.value)}
          />
          <label>Breed</label>
          <input
            type="text"
            breed="breed"
            onChange={(e) => setBreed(e.target.value)}
          />
          <label>Color</label>
          <input
            type="text"
            color="color"
            onChange={(e) => setColor(e.target.value)}
          />
          <label>Animal Size</label>
          <input
            type="int"
            animal_size="animal_size"
            onChange={(e) => setAnimal_size(e.target.value)}
          />
          <label>Common Color</label>
          <input
            type="text"
            common_color="common_color"
            onChange={(e) => setCommon_color(e.target.value)}
          />
          <button className="btn1" onClick={() => {add(toast.success)
          addAnimal_management()}}  type="submit" >
            Add Breed
          </button>
  

        </form>
      </div>
      <div className="animal_management">
        <button className="btn2"  onClick={getAnimal_management}>
          Show Animals
        </button>
      
        {animal_managementlist.map((animal) => {
          return (
            <div>
              <div>
            <table>
              <tr className="big">
                <th>Animal Type</th>
                <th>Breed</th>
                <th>Color</th>
                <th>Animal Size</th>
                <th>Common Color</th>
              </tr>
              <tr className="sanaullah">
                <td>{animal.animal_type}</td>
                <td>{animal.breed}</td>
                <td>{animal.color}</td>
                <td>{animal.animal_size}</td>
                <td>{animal.common_color}</td>
              </tr>
            </table>
            </div>
            <div>
                <input
                  type="text"
                  placeholder="change value"
                  onChange={(event) => {
                    setNewAnimal_size(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateAnimal_management(animal.id);
                    show(toast.success)
                  }}
                >
                  {" "}
                  Update
                </button>
                
                <button
                  onClick={() => {
                    deleteAnimal_management(animal.id);
                    deleted(toast.success)
                  }}
                >
                  Delete
                </button>
                </div>            

            </div>
          );
          
        })}
      </div>
      <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover={false}
    />
    

    </div>
    
    
  
  );
}
export default App;
