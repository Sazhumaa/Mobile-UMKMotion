import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Pokemon() {
    const [loading, setLoading] = useState<any>(true)
    const [items, setItems] = useState<any[]>([])
    const [error, setError] = useState<any>(null)

    async function loadPokemon() {
        try {
            setError(null)
            setLoading(true)
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
            if (!res.ok) throw new Error(String(res.status))
            const json = await res.json()
            const results : Array<any> = json.results || []
            const mapped = results
                  .map(r => {
                    const m = r.url.match(/\/pokemon\/(\d+)\/?$/)
                    const id = m ? Number(m[1]) : NaN
                    return {
                        id,
                        name: r.name,
                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                    }       
                    })
            setItems(mapped)
        } catch (err: any) {
            setError(err?.message ?? 'fetch error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadPokemon()
    }, [])


    function renderItem({ item }: {item:any}) {
        return (
            <TouchableOpacity className="flex-1 m-2 bg-gray-100 
            rounded-xl items-center p-3 min-2-[140px]"
            >   
                <Image source={{ uri: item.image }}
                className="w-24 h-24 mb-2"/>
                <Text className="capitalize font-semibold">#{item.id} - {item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView className="flex-1 p-4 bg-white">
            <Text className="text-xl font-bold mb-2 text-center bg-slate-300">PokeApi - Pokemon</Text>

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={{paddingBottom: 24}}
                ListEmptyComponent={<Text className='text-center mt-10
                text-gray-500'>DATA KOSONG</Text>} 
            />

        </SafeAreaView>
    );
}
