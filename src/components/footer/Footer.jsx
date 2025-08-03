import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Copyrights = styled.div`
  font-weight: bold;
`

const Widget = styled.div``

const FooterContainer = ({ className }) => {
  const [location, setLocation] = useState('')
  const [temperature, setTemperature] = useState('')
  const [weather, setWeather] = useState('')

  useEffect(() => {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Smolensk&lang=ru&appid=14d07d0121b180c9aea98a6673678a71',
    )
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Ошибка получения данных о погоде: ' + res.statusText)
      })
      .then(({ name, weather, main }) => {
        setLocation(`${name},`)
        setTemperature(`${Math.round(main.temp - 273.15)}°C,`)
        setWeather(`${weather[0].description}`)
      })
      .catch(err => {
        setWeather('Погода недоступна')
        console.warn(err)
      })
  }, [])

  const nowDate = new Date()

  return (
    <footer className={className}>
      <Copyrights>
        <div>Blog</div>
        <div>&copy;&nbsp;{nowDate.toLocaleString('ru', { year: 'numeric' })}</div>
      </Copyrights>
      <Widget>
        <div>
          <span>{location}</span>
          &nbsp;
          <span>
            {nowDate.toLocaleString('ru', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <div>
          <span>{temperature}</span>
          &nbsp;
          <span>{weather}</span>
        </div>
      </Widget>
    </footer>
  )
}

export const Footer = styled(FooterContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  width: 100%;
  padding: 20px;
  background-color: #f8f9fa;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`
