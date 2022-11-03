const indexedDB = window.indexedDB
const formulario = document.getElementById('form-registro')
const texto = document.getElementById('cuantosUsuarios')

if (indexedDB && formulario) {
  let db
  const request = indexedDB.open('BBDDDesmotivanador', 1)

  request.onsuccess = () => {
    db = request.result
    console.log('OPEN', db)
    readData()
  }
  request.onupgradeneeded = (e) => {
    db = e.target.result
    console.log('Create', db)
    const objectStore = db.createObjectStore('usuarios', {
      autoIncrement: true
    })
  }
  request.onerror = (error) => {
    console.log('Error', error)
  }

  const addData = (data) => {
        const transaction = db.transaction(['usuarios'], 'readwrite')
        const objectStore = transaction.objectStore('usuarios')
        const request = objectStore.add(data)
        readData()
  }

	const readData = () => {
        const transaction = db.transaction(['usuarios'], 'readonly')
        const objectStore = transaction.objectStore('usuarios')
        const request = objectStore.openCursor()
		const cantidad = document.createElement('span')
		let cantidadFilas = 0
		
        request.onsuccess = (e) => {
            const cursor = e.target.result
            if (cursor) {
				cantidadFilas++
                cursor.continue()
            } else {
				texto.textContent = ''
				cantidad.textContent ='Usuarios Registrados: ' + cantidadFilas
                texto.appendChild(cantidad)
            }
        }
    }
  formulario.addEventListener('submit', (e) => {
        e.preventDefault()
        const data = {
            usuario: e.target.correo.value,
            contra: e.target.pass.value
        }
        addData(data)
    })
}
