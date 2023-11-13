import React, { useEffect } from 'react'

import HeaderTextComponent from './HeaderTextComponent'
import AppCard from './AppCard'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ITEM_DETAILS } from '../../navigation/routes'
import { useSelector } from 'react-redux'
import useServices from '../../../utils/services'

export default function LowOffers() {
  const navigation = useNavigation()
  const services = useSelector((state)=>state.services.services)?.data
  return (
    <HeaderTextComponent name={'Low Offers'}  showAll={true}  >
        <FlatList
        horizontal
        data={services}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item,index)=>item.id}
        style={{
            display:'flex',
            flexDirection:'row',
            gap:15
        }}
        renderItem={({item})=>(
            <AppCard
            name={item?.attributes?.name}
            price={item?.attributes?.Price}
            onPress={()=>navigation.navigate(ITEM_DETAILS,{item})}
            image={item?.attributes?.image?.data?.attributes?.url}
            />

        )}
        />
    </HeaderTextComponent>
  )
}
