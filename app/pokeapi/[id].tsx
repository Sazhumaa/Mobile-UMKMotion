// import { SafeAreaView, } from "react-native-safe-area-context"
// import { ActivityIndicator, Text, View } from "react-native"
// import { useLocalSearchParams } from "expo-router"
// import { useEffect, useState } from "react";
// import { Image } from "react-native";

// export default function PokemonDetail () {
    
//     const params = useLocalSearchParams();
//     const id = params.id;
    
//     const [loading, setLoading] = useState<boolean>(true)
//     const [error, setError] = useState<string | null>(null)
//     const [pokemon, setPokemon] = useState<any>(null)
    
//     useEffect(() => {
//         fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
//         .then(res => res.json())
//         .then(json =>{
//             setPokemon({
//                 id: json.id,
//                 name: json.name,
//                 image: json.sprites.front_default
//             })
//         })
//         .catch(err => {
//             setError(err?.message ?? `fetch error`);
//         })
//         .finally(() => {
//             setLoading(false);
//         })
//     }, [id])
    
//     return(
//         <SafeAreaView>
//             <Text>
//                 Pokemon Detail Screen
//             </Text>
            
//             {loading ? (
//                 <ActivityIndicator size="large" />
//             ): error ? (
//                 <Text className="text-red-600">ERROR: {error}</Text>  
//             ) : (
//                 <View>
//                     <Text>{pokemon?.id}</Text>
//                     <Text>{pokemon?.name}</Text>
//           <Image
//             source={{ uri: pokemon.image }}
//             className="w-[150px] h-[150px] mt-4"
//           />
//                 </View>
//             )}
//         </SafeAreaView>
//     )
// }

import { SafeAreaView } from "react-native-safe-area-context"
import { ActivityIndicator, Text, View } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react";
import { Image } from "react-native";

export default function PokemonDetail () {
    
    const params = useLocalSearchParams();
    const id = params.id;
    
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [pokemon, setPokemon] = useState<any>(null)
    
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(json =>{
            setPokemon({
                id: json.id,
                name: json.name,
                image: json.sprites.other["official-artwork"].front_default
            })
        })
        .catch(err => {
            setError(err?.message ?? `fetch error`);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [id])
    
    return(
        <SafeAreaView>
            <Text>Pokemon Detail Screen</Text>
            
            {loading ? (
                <ActivityIndicator size="large" />
            ): error ? (
                <Text style={{ color: "red" }}>ERROR: {error}</Text>  
            ) : (
                <View>
                    <Text>ID: {pokemon?.id}</Text>
                    <Text>Name: {pokemon?.name}</Text>

                    {/* IMAGE POKEMON */}
                    <Image 
                        source={{ uri: pokemon?.image }} 
                        style={{ width: 200, height: 200 }}
                        resizeMode="contain"
                    />
                </View>
            )}
        </SafeAreaView>
    )
}
