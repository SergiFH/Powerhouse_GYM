// =======================
// GUARDAR CLIENTE
// =======================
function guardarCliente() {
    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;

    if (!nombre || !telefono) {
        alert("Llena todos los campos");
        return;
    }

    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    clientes.push({
        nombre: nombre,
        telefono: telefono,
        activo: false
    });

    localStorage.setItem("clientes", JSON.stringify(clientes));

    alert("Cliente guardado");
    mostrarClientes();
}

// =======================
// MOSTRAR CLIENTES + ELIMINAR
// =======================
function mostrarClientes() {
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    let lista = document.getElementById("lista");

    if (!lista) return;

    lista.innerHTML = "";

    clientes.forEach((c, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
        ${c.nombre} - ${c.telefono} - ${c.activo ? "Activo" : "Inactivo"}
        <button onclick="eliminarCliente(${index})">❌</button>
        `;

        lista.appendChild(li);
    });
}

// =======================
// ELIMINAR CLIENTE
// =======================
function eliminarCliente(index) {
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    clientes.splice(index, 1);

    localStorage.setItem("clientes", JSON.stringify(clientes));

    mostrarClientes();
}

// =======================
// REGISTRAR PAGO
// =======================
function registrarPago() {
    let nombre = document.getElementById("clientePago").value;
    let monto = parseFloat(document.getElementById("monto").value);
    let metodo = document.getElementById("metodo").value;
    let membresia = document.getElementById("membresia").value;

    if (!nombre || !monto) {
        alert("Completa los datos");
        return;
    }

    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    let pagos = JSON.parse(localStorage.getItem("pagos")) || [];

    let encontrado = false;

    clientes.forEach(c => {
        if (c.nombre === nombre) {
            c.activo = true;
            encontrado = true;
        }
    });

    pagos.push({
        nombre: nombre,
        monto: monto,
        metodo: metodo,
        membresia: membresia
    });

    localStorage.setItem("clientes", JSON.stringify(clientes));
    localStorage.setItem("pagos", JSON.stringify(pagos));

    if (encontrado) {
        alert("Pago registrado correctamente");
    } else {
        alert("Cliente no encontrado");
    }
}
// AUTO ASIGNAR MONTO
function actualizarMonto() {
    let select = document.getElementById("membresia");
    let monto = document.getElementById("monto");

    monto.value = select.value;
}
// =======================
// VERIFICAR ACCESO
// =======================
function verificarAcceso() {
    let nombre = document.getElementById("clienteAcceso").value;

    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    let cliente = clientes.find(c => c.nombre === nombre);

    if (cliente && cliente.activo) {
        alert("✅ Acceso permitido");
    } else {
        alert("❌ Acceso denegado");
    }
}

// =======================
// DASHBOARD
// =======================
function cargarDashboard() {
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    let pagos = JSON.parse(localStorage.getItem("pagos")) || [];

    let activos = clientes.filter(c => c.activo).length;

    let ingresos = pagos.reduce((total, p) => {
        return total + (p.monto || 0);
    }, 0);

    if (document.getElementById("totalClientes"))
        document.getElementById("totalClientes").innerText = clientes.length;

    if (document.getElementById("activos"))
        document.getElementById("activos").innerText = activos;

    if (document.getElementById("ingresos"))
        document.getElementById("ingresos").innerText = ingresos;
}

// =======================
// REPORTES
// =======================
function cargarReportes() {
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    let pagos = JSON.parse(localStorage.getItem("pagos")) || [];

    let activos = clientes.filter(c => c.activo).length;

    let ingresos = pagos.reduce((total, p) => {
        return total + (p.monto || 0);
    }, 0);

    if (document.getElementById("repActivos"))
        document.getElementById("repActivos").innerText = activos;

    if (document.getElementById("repIngresos"))
        document.getElementById("repIngresos").innerText = ingresos;
}

// =======================
// AUTO CARGA
// =======================
window.onload = function () {
    mostrarClientes();
    cargarDashboard();
    cargarReportes();
};