import React from 'react'

import HeaderTextComponent from './HeaderTextComponent'
import AppCard from './AppCard'
import { FlatList } from 'react-native'
import { LowOffersList } from '../../data/home'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { ITEM_DETAILS } from '../../navigation/routes'

export default function OtherServicesList() {
  const services = useSelector((state)=>state.services.services)?.data
  const navigation = useNavigation()

  return (
    <HeaderTextComponent name={'otherServices'} >
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
