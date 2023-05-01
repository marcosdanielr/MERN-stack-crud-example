import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../api'

export function User() {
  const [data, setData] = useState({
    name: '',
    age: null,
    sex: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  function handleOnChange(event) {
    const { name, value } = event.currentTarget

    setData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  function getUser() {
    setIsLoading(true)

    api
      .get(`/get/${id}`)
      .then(response => setData(response.data))
      .catch(() => alert('Error'))
      .finally(() => setIsLoading(false))
  }

  function updateUser() {
    setIsLoading(true)

    api
      .patch(`/update/${id}`, data)
      .then(() => navigate('/'))
      .catch(() => alert('Error'))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => getUser(), [])

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem',
        height: '100vh'
      }}
    >
      <input
        placeholder="Type name"
        name="name"
        value={data.name}
        onChange={handleOnChange}
      />
      <input
        placeholder="type age"
        name="age"
        value={data.age ?? ''}
        type="number"
        onChange={handleOnChange}
      />
      <input
        placeholder="type sex"
        name="sex"
        value={data.sex}
        onChange={handleOnChange}
      />
      <button onClick={updateUser} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Edit'}
      </button>
    </div>
  )
}
