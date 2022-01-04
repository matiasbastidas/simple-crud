var filaSeleccionada = null

function enviarFormulario() {
    if (validar()) {
        var datosFormulario = leerDatosFormulario();
        if (filaSeleccionada == null)
            insertarNuevoRegistro(datosFormulario);
        else
            actualizarRegistro(datosFormulario);
        reiniciarFormulario();
    }
}

function leerDatosFormulario() {
    var datosFormulario = {};
    datosFormulario["nombreCompleto"] = document.getElementById("nombreCompleto").value;
    datosFormulario["cargo"] = document.getElementById("cargo").value;
    datosFormulario["sueldo"] = document.getElementById("sueldo").value;
    datosFormulario["ciudad"] = document.getElementById("ciudad").value;
    return datosFormulario;
}

function insertarNuevoRegistro(datos) {
    var tabla = document.getElementById("listaEmpleados").getElementsByTagName('tbody')[0];
    var nuevaFila = tabla.insertRow(tabla.length);
    cell1 = nuevaFila.insertCell(0);
    cell1.innerHTML = datos.nombreCompleto;
    cell2 = nuevaFila.insertCell(1);
    cell2.innerHTML = datos.cargo;
    cell3 = nuevaFila.insertCell(2);
    cell3.innerHTML = datos.sueldo;
    cell4 = nuevaFila.insertCell(3);
    cell4.innerHTML = datos.ciudad;
    cell4 = nuevaFila.insertCell(4);
    cell4.innerHTML = `<a onClick="editar(this)">Editar</a>
                       <a onClick="eliminar(this)">Eliminar</a>`;
}

function reiniciarFormulario() {
    document.getElementById("nombreCompleto").value = "";
    document.getElementById("cargo").value = "";
    document.getElementById("sueldo").value = "";
    document.getElementById("ciudad").value = "";
    filaSeleccionada = null;
}

function editar(td) {
    filaSeleccionada = td.parentElement.parentElement;
    document.getElementById("nombreCompleto").value = filaSeleccionada.cells[0].innerHTML;
    document.getElementById("cargo").value = filaSeleccionada.cells[1].innerHTML;
    document.getElementById("sueldo").value = filaSeleccionada.cells[2].innerHTML;
    document.getElementById("ciudad").value = filaSeleccionada.cells[3].innerHTML;
}

function actualizarRegistro(datosFormulario) {
    filaSeleccionada.cells[0].innerHTML = datosFormulario.nombreCompleto;
    filaSeleccionada.cells[1].innerHTML = datosFormulario.cargo;
    filaSeleccionada.cells[2].innerHTML = datosFormulario.sueldo;
    filaSeleccionada.cells[3].innerHTML = datosFormulario.ciudad;
}

function eliminar(td) {
    if (confirm('Estas seguro de que quieres eliminar el registro?')) {
        row = td.parentElement.parentElement;
        document.getElementById("listaEmpleados").deleteRow(row.rowIndex);
        reiniciarFormulario();
    }
}

function validar() {
    esValido = true;
    if (document.getElementById("nombreCompleto").value == "") {
        esValido = false;
        document.getElementById("errorValidacionnombreCompleto").classList.remove("hide");
    } else {
        esValido = true;
        if (!document.getElementById("errorValidacionnombreCompleto").classList.contains("hide"))
            document.getElementById("errorValidacionnombreCompleto").classList.add("hide");
    }
    return esValido;
}