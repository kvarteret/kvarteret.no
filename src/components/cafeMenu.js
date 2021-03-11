import React from 'react'
import { Grid } from '@material-ui/core'
import Layout from '../components/layout'

const style_image = {
  height: '20%',
  width: '20%',
}

/**
 * Liste over retter i menyen
 * TODO: Get this data from database
 * @type {menuItem[]}
 */
const lunchItemsData = [
  {
    navn: 'Lunsj1',
    bildeUrl:
      'https://cdn.digg.com/images/0d220736ec91419682471c71dfc8a439_407c1382cbc6d6213971e53f30091ec1_1_original.jpeg',
    beskrivelse: 'Sykt digg',
    ingredienser: 'masse greier',
  },
  {
    navn: 'Lunsj2',
    bildeUrl:
      'https://cdn.digg.com/images/0d220736ec91419682471c71dfc8a439_407c1382cbc6d6213971e53f30091ec1_1_original.jpeg',
    beskrivelse: 'Sykt digg',
    ingredienser: 'masse greier',
  },
]

const dinnerItemsData = [
  {
    navn: 'Middag1',
    bildeUrl:
      'https://cdn.digg.com/images/0d220736ec91419682471c71dfc8a439_407c1382cbc6d6213971e53f30091ec1_1_original.jpeg',
    beskrivelse: 'Sykt digg',
    ingredienser: 'masse greier',
  },
  {
    navn: 'Middag2',
    bildeUrl:
      'https://cdn.digg.com/images/0d220736ec91419682471c71dfc8a439_407c1382cbc6d6213971e53f30091ec1_1_original.jpeg',
    beskrivelse: 'Sykt digg',
    ingredienser: 'masse greier',
  },
]

/**
 * Generate menuItem based on MenuItemData
 * @param {MenuItem} menuItem
 */
const getCafeMenuItem = (menuItem) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <h3>{menuItem.navn}</h3>
      {menuItem.beskrivelse}
      {menuItem.ingredienser}
      <img style={style_image} src={menuItem.bildeUrl} />
    </Grid>
  )
}
const cafeMenu = () => {
  const menuItemComponents = []
  lunchItemsData.forEach((menuItemData) => {
    menuItemComponents.push(getCafeMenuItem(menuItemData))
  })

  dinnerItemsData.forEach((menuItemData) => {
    menuItemComponents.push(getCafeMenuItem(menuItemData))
  })

  return (
    <Layout spacingTop={true}>
      <div>
        <img src="https://cdn.digg.com/images/0d220736ec91419682471c71dfc8a439_407c1382cbc6d6213971e53f30091ec1_1_original.jpeg" />
        <h1>KAFEMENY</h1>
      </div>
      <Grid container direction="row">
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <h2>LUNSJ</h2>
          {lunchItemsData.map((menu) => getCafeMenuItem(menu))}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <h2>MIDDAG</h2>
          {dinnerItemsData.map((menu) => getCafeMenuItem(menu))}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default cafeMenu

/**
 * @typedef MenuItem
 * @property {string} navn
 * @property {string} beskrivelse
 * @property {string} imgUrl
 * @property {string} ingredienser
 */
