import React, { useState, useEffect } from "react";
import "./TodoList.css";
import Icone from './assets/icon.webp'
function TodoList(){
    const liststorage = localStorage.getItem('lista');
    const [lista, setLista] = useState(liststorage ? JSON.parse(liststorage) : []);
    const [novoItem, setNovoItem] = useState ("");
    
    useEffect(() => {
        localStorage.setItem('lista', JSON.stringify(lista));
      }, [lista]);

    function adicionaitem(form){
        form.preventDefault();
        if (!novoItem){
            return;
        }
        setLista([...lista, { text: novoItem, isCompleted: false}]);
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }
    
    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }
    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }
    function deletatudo(){
        setLista([]);
    }
    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaitem}>
                <input type="text"
                id="input-entrada"
                value={novoItem}
                onChange={(e) => {setNovoItem(e.target.value)}}
                placeholder="Adicione uma tarefa."
                />
                <button className="add" type="submit">ADD</button>
            </form>
            <div className="listaTarefas">
                <div className="central" style={{textAlign: "center"}}>{
                    lista.length < 1 
                    ?
                    <img src={Icone} />
                    :
                    lista.map((item, index) => (
                        <div
                        key={index}
                        className={item.isCompleted ? "item completo" : "item"}
                      >
                        <span onClick={()=>{clicou(index)}}>{item.text}</span>
                        <button onClick={()=>{deleta(index)}} className="del">Deletar</button>
                      </div>
                    ))
                }
                </div>
               {
                lista.length > 0 &&
                <button onClick={()=>{deletatudo()}} className="deleteall">Delete todos!</button>
               }
            </div>
        </div>
    )
    
}

export default TodoList