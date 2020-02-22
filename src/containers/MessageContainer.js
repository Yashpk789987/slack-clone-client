import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Comment } from 'semantic-ui-react';
import Messages from '../components/Messages';

const MessageContainer = ({ data: { loading, messages } }) => {
  if (loading) return null;
  return (
    <Messages>
      <Comment.Group>
        {messages.map(m => {
          return (
            <Comment key={`${m.id}-message`}>
              <Comment.Avatar src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDxAQDQ4QDQ4PEBAQEA4OEBAQEBAPFREWFhcRFhUYHSogGCYmGxUTIjIhJSkrLi4uFx8zRDMsNygtLjcBCgoKDg0OGhAQGislICYtLTA3LSsrLS0uMi8tLS0tLSstLy0tLS0rLS0tLS0vLS0rKy0rLSsvLS0tLS0tLS8tLf/AABEIAMkA+wMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIDBQYHBAj/xABDEAACAQMBBAYFCAcIAwAAAAAAAQIDBBEFBhIhMRMiQVFhcQcygZGxFBUjQnKCocEzUlNikrLCFiRDRKLR4fA0c3T/xAAaAQEAAgMBAAAAAAAAAAAAAAAAAQIDBAUG/8QANBEBAAECAgULBAMBAAMAAAAAAAECAwQREiExUfAFExQyQWGBkaGx0SJxweEVQlIzQ6Ky/9oADAMBAAIRAxEAPwDuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALdWtCHrzjD7UkviTETKJmIWfnKhy+UUc93SQ/3J0KtyNOnev06sZcYyjJd8Wn8CJjJbNWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGE13aq0ssqtV3qmP0NLr1PauUfvNGa1h67myNW9r3sTbtdade7taq9r9TvsrS7Ho6bylXqLe9u9LEF5dY2ujWbf/AEq8ONbU6Vfu/wDKnVvnjL3P7Hatc8b3VXTT+pSdSS9sY7kfiOk2KOpRx6p6LiK+vc8uIWpejjTqf/k6hUUu1upb0uP3kyem3Z6tPudBtR1qp84W/wCxWhPh85cf/stM/wAo6TiP8+ko6Lhtml6wqj6M7CfGz1Gop/Vkp0KuH9xRZHTbkdan3W6Dbnq1SrlsnrdpxstU+URX1K0pL2KFTfj+KHP4evr0ZfbiE9HxFHUrz+6mO3uoWMlDWNOko5x01FbufLi4TflJDotu5rtVHSrlv/rT4w3TQdprS+WbWtGU0sypS6lWPnB8fasrxNS5Zrt9aG3bvUXOrLLmJlAAAAAAAAAAAAAAAAAAAAAAAFq5uIUoSqVZxp04LMpyeEkTTTNU5QiqqKYznY5/f7T3mp1ZW2kQlTpLhO5fUluv6zl/hrnj6zx2cUdCjD27MaV3bu42+zl14m5iKtCxGUb+Nnu8vyLStLbd5P5xvU8ulFKcYz8Yt7q85tvtSLad+/1Ppp441K6GHw/XnSq441sfqvpJu6nVtoU7SHJYSq1EvOS3V/CZKMDRHW1sdzlC5OqmMvVqeoaxc189Pc1qqfOM6knD+HOF7jZptUU7Ihq1XrlfWqljWl3GRjUMChpdwSydhtDeW+Ogu69NLlHpJSh/BLMfwMdVm3VtiGai/cp2VS2zS/SjcJdHf0KV5SaxJpKnNrtyuMJeWEateBp20Tk2rfKFWyuM3r+ZdM1Nqro1x8330eureTdPrLuSeY+dNtLuKc5dtarsZ07+Pyy83avfVanKrjjU9+ibcXNlWVnrtOUJLhC6wvV7JSxwmv3493Fc2UuYam5Tp2fJe3iqrdWhe83SKdRSipQkpRklKMotNSi1lNNcznzGToROaoAAAAAAAAAAAAAAAAAAAAFu5rwpQlUqSUIQi5SlLgoxSy2yYiZnKEVVRTGcuXajqFTWKs5TqfJNKtXvTqS4eTa+tN9keOM9rfHqUURh6dUZ1zx5ONcrqxVUzM5URx5+zHattXin8l0yLs7SPDejwr1n2ylLms+/x7DJbw+vTua59GK5itWha1U+stVZtNNbkwlakSlbkBQwlSwJp05SeIxcn3JZA91HSJvjOSgv4n/sRmrNUQzWmbKVajUqNCvV4pxmlKMU1yanwS95irvUU9aYZaLd2rXRTPHe2642X1O7hCN04zjT9RXNWM3HhjOUpNvHa+JqxiLFE50+kNqcNi7kZVT5z8ZvTbbEXsYqCu4U4R5Qp1K26u3gsJIicZazz0fSExyffyy08vGV17G3y9W+Wf8A2V4/Ajpdrtp9ITPJ+I7LnrKFoesUvUunU8FcTl+FRYJ5/DVbafT4U6LjqOrX/wC0z7wj531i3/TUXVS5uVJTWPtUnhe0nmcLc6s5ePyr0nH2uvTn4Z//AC9tht7TlwuKMqb5OVNqovanhr8SlfJ9UdWc2S1yzROq5Tl9tfxPu2bT9UoXCzQqxqdriniS84vivajSuWq7fWjJ1LOItXozt1RPG7a9hjZgAAAAAAAAAAAAAHNfSHrErm4jp1CahTp9e6qP1E4ree94Qj1n3vC5o6WEtxRTzs+HHe5WNuzcr5mnZ28dzTNX1RVFChQTp2dD9FTfrTl216mOc5cfBJ4Xju27eX1TtnjKO5z7lzSypp6sbPme+WMbMjEpbAtyZItyYStsCIxcmlFNt8kglltP0SU5RUlKpOT6tKmm233cOL9hWqqIjNEZzOUOgaL6P6jincyVtT59HT3XUx4v1Y/iaNzG0xqojNv2uTq6tdycvf492YjcaPYeooVqse2K6epn7T6sfLKMOjiLu3VHk2NLCWNmufOf08t36Q/2Fq8frVZpP+GKfxLU4D/VXkx18qf5p85492KrbdXsuXQ0/sU2/wCZszRgrUb2tPKN+d3l+3lltdfv/NNeVOgv6DJGFs/59Z+WGcdiP9+kfBHay/X+al7adF/0E9Fs/wCff5R07Ef79I+Hqo7bXsec6dT7dNf0tFZwVqd/mtHKeIjtifvHxkydr6QJ8Omtoy75U5uPui0/iYquT4/rV5s9HLFUdejyn8ft73rWl3vC4gqc3wzWhuSXlVjy96MfMYmz1J8vhlnF4LE6rkZT3xl6x8vNebFrhV0+48YqUv5KkeX/AHiZKMf/AFu08fZgvckf3w9fr7THHetWe091aT6K/pSml2tJVUu9P1Zr/uS9eDtXo0rU/H6YrfKeIw1WhiKZn3+J41ty0/UKVxDfoTU49uOcX3SXNHMuWqrc5VQ71jEW71OlbnOHqMbMAAAAAAAAAAHg17UlaWta4lh9FTcknwUp8ox9sml7S9qjTrinex3bkW6JqnscBleTkqjk3KdaW9Vm+cutvY9suL8Yx7jv6MRl3PNzVM559qzvEqocgKWyRQ2EqJMCq3t5VJYj7X2JAbnsrsrUuH9Etykv0lxNcPJd78OztNa9iKbca9u5msYau9OrVG9tM9cstNi6Wn01c18YnXk8xb8Zr1vKPDxRq8zdvTncnKN3H5bnSLOGjRtRnO/9/Gpq+qa5c3TfT1ZOP7OPVpr7q5+3LNu3Zot9WGhdxFy71p8Ozj7seZWEAIISSqlBEpRKkqkSpKpFlJeuwv61vLeoVZUn27r6r84vg/aitdui5GVUZptXrlmc7dUxxu2NptdqaNzDodSoxcXyqwTwn3tc4vxj+Bo1YOu3OnZnw42+Lq2+U7V+nm8VTq3xxnH3j0ee90qtYtXVjVdW3azvxaliPdNLhKPj8OZkovUX45u7GU8bN0sF7CXcJPP4erOnf8747/ba2nZ3aGneRw8U68V1qeeDX60e9fD3M5+JwtVmc9sb3awPKFGJjLZVHZ+Y7vZmjVdAAAAAAAAAAaH6X71ws6VJPHTV1vLvhCLl/NuG9gKc7kzuhoco1ZW4jfLkaZ1nEMgMgQ2EqGwKqFF1JKMe3m+5d4G67N6HTlGVSvLobKi/par9apP9nHvb4cuWV4GteuzT9NOuqeM2azZivOuucqY2z+IerXNopV4qhbx+TWcVuxox4Oce+bXPy5efMrasRTOlVrq3rX8VNcaFOqnd8/DBmw1EgAAAICUKkFUolWVSJUlUiVJVIljlJKssno2tVrSWab3qbfXoy9SS7fJ+PxMN6xRdjXt3tnC4y5hp+nZ2xOz9T3+73X9tBpX2mycIwknVpLhO2n3pfqvj4ezKWK3XP/G94Tv/AHxtbF61Tl0nCzlEbY7aZ+PTw2blszrkbyll4jWhhVILl4TXg/w5HMxOHmzV3Tsd/AY2MTbznrRtj8/aWZNZvAAAAAAAAHLvTVLrWK8Ll/jSOnyf/bw/Llcpf18fw5pk6LlpyBGQIbAhsDZdA0zLUZSVPK361R8VSpR5t9+O7tbS7TFcryjNNFOnVlxl2yyWq6j025TpxdO2o9WjR7l21J98nxbfj7627ejrnbO2eOxN27p5RGqmNkfme+XgMjEAAAAAEAQlEoSSrKpEqSqRKkpRKkwqRKuSchGT06ffzt6iqU2s8pRlxhOD5wku1Mpct03KdGWSzeqs16dP6mN0vfTuvktendWmehm39G3xjy6S3k/DKafc4swzTztE269vGU8d7apudHu03rPVns96Z+3Z4S6daXMatOFSm96E4qUX4NHDrpmmqaZ7HrLdym5TFdOyV4quAAAAAAA5n6a7dunZ1eyM61N+c4wkv5GdHk+rXVDmcpU/TTLlmTpuSZAZAZA9Wl0d+os8o9Z+fZ+PwIklsiq4g4L67Tm+9R9WPknl+eO5GPLXmjP6cuO7j4WiyoAAAAAAAEJCEolVKJVmEpkqTCpMlWYTklXJOQjIyEZLtKtiMoP1Z4eO6cc7sl72vKTKzGuJXpnKJp7J9+yeOyZbp6OtSzGpbSfq/S0/st4nH2Np/eZzeULeuK4+zu8j39U2p7Ncfn1926nNdsAAAAAABq3pL013Gm1t1ZnQ3biP3M73+hzNnCV6N2O/U1sZb07U92twfJ23AMgMgMgZjQ4dWUu+WPYl/wAlalKmTIVAAAJAAAAACAAEJTJVyVZJRMJyFZhOSVck5JVyMgyMgyZLZm86G8oT5J1FTl9mfV4+WU/YYMRRp2qo41NrB3Obv01d+XnqdeOC9aAAAAAAAiUU001lNYafFNdwHzxtjobsLypRw+ib36En9ajJ8OPbjjF+MTvWLvOURV2vPYmzzVyY7GFMzAAAM/o6+hXi5fHBWdqlW17SFQAAAAAASAAAQAAhOSUJyEZJySrkZCMk5JRkZBkhya4rg1xXmuQ2muNcO4Up70Yy/WSfvR5yYynJ7OJzjNWQkAAAAAABrW3ezEdRtt2OI3NLMqE3yz202+6WF5NJ9mDYw1/mqu5r4mxF2jLtcFuKM6c5U6kXCpCTjOElhxkuaZ24mJjOHAqpmmcpWyUAGf0aWaS8JSX45/MrLHVte4hUJAgAASAAASAAAQAAJJQZCE5CMgIyCTJEuT8gidjt1isUqafZTh/Kjz1XWl7CjqwvlVgAAAAAAADTtu9iIahHpqO7SvIrCk+EayXKE/yl8Vy28NiZtap2NTE4WLsZxtcTvrOpQqTpV4SpVabxOEuaf58MNNcGmdimqKozjY4lVM0zoztWCyrM6DU4Tj4qS92H8EVlStliGMAAAICQgAkABIAAAAgABABJKAC5bUXUnCmudScaa85SUfzImrRiZ3Jpo0pinfq83cEsHnnrkgAAAAAAAAAHMvTVp8OjtrlJKr0joSa5yg4yms+Ti/4mdHk+uc5p7Nrm8o0RoxV2uUHUcl6tNr9HVi3yfVl5P/nBEq1RnDZirBmAzAkAgJAIISBIACQAAAAAgAAANh2EsemvYSa6lBOrLuzyive8/dNbF16NuY3tzAWtO9E7tfxx3OqnHehAAAAAAAAAADinpY2gVzdK3pSzRtN6MmuUq79b+HCj57x2MFZ0KNKds+zjY+9pV6EdjRjdaC1XuYQ9aXF8FFcZNvsSMddymjbLJbtV1z9MNq0yu5RcJpxq03uzjJNSWOHFPiu5+KLbdcNS7TNNWt7MBjzMBOaAkISgJAIISBIACQAAAAAAQAdS2F0l29tvzWKtxipJPnGGOpH3NvzkzkYu7p15Rsh38BY5u3nO2eIbIareAAAAAAAAAHm1K3nVozp060rec4uKrQScoZ7Vnt8S1MxE5zGaKozjLNzKr6Hpt9TU1GPdKzcpe/pl8Dd/kK90ND+Oo3yvW3obo/5nUbmou2NCFKgn4cVJ/iYqsZcq7WajB2qexuGz2xWnae960tIRq/t6matbjz+knlryWEa81TO1sxTEbGo+k/ZyVOfznaxzjCuqa7VyVXHlhPyT72dDBX//AB1eHw5nKGG0o048flq9tXjUipQeU/en3M6Tz9UTTOUrmAjMwFs0EJzQQlAWQEhCQAEgAAAAAANl2K2fd1V6WrH+70mm88qlRcVDyXN+7tNXFX+bp0Y2y3cFhudq0qurHrO75dROQ74AAAAAAAAAAAAAABTOCknGSUotNNNZTT5poDj22eydTTKkrqzi6ljN9enxboNvk/3e6XZyfj2MLiorjRq2+7h43A5fVTs9mNtbmFWO9B5712xfc0bri1RNM5SutBESpwQtEoaIWiUBbNDRCQJQQsAAkAAAAGZ2Z2eqXtTthQg/pKv9Ee9/Dn3J4L9+LUd7Zw2GqvVd3bPHa6vaW0KNONOlFQpwWIxXYvz8zj1VTVOcvQ0URRTFNOxeKrAAAAAAAAAAAAAAAACmcVJNSSlFppprKafNNAcx2s9HU6cpXOkcO2dplLz6Nvg1+4/Z2I6eHxv9bnn8uViuT4qzmjy+Gn22qredO4i6FWL3ZKacUpLmmnxi/BnSiYlwbmHqonV+2RwTkwxKGiFolS0QvEoIWiVLIWQQsBIEgACGwNo2Z2PqXOKlwpUbfmlyqVV4L6q8X7O81L+KijVTrlv4bA1XPqr1R6zxxvdKtbaFKEadKChCCxGMVhJHKqqmqc5dummKY0aY1LpCwAAAAAAAAAAAAAAAAAAAGD2j2UtNQX94pYqpYjXp4jVj4b31l4PKM1q/Xb6s+DDdw9F3rQ5zqno+1CzblZTV5R57ixGol4wk8Pzi8vuOlax1FWqrU5N/kydsa/drz1aVOXR3VCpQqLnFxcWvOMsNG5FUVRnDl14Wqmfl6qV/Sn6tSPk3uv3Mlj0Ko2wv/iQRKCF4lSyFkEJAkCQC7Z1+iq06iW90c4T3XhqW7JPd9uCtVOlEwtRVo1RVudtoVo1IRnB70JxUotdsWsp+44MxMTlL1NNUVREwuEJAAAAAAAAAAAAAAAAAAAAAAAHnvbCjXjuXFGnXh+rVhGa9zRamqqmc6ZyVqppq1TGbV9Q9Gum1suNKpbyfbQqNf6Z70V7EbNONu09uf3a1eCtVdmX2YOv6I4J5t7+pT8J0lN++Mo/AzRyhPbSwVcm0zsqeWXotu16moxfnGqv6mX/kKf8ALHPJnfHkR9F96/W1GCXgqr/ND+Qp/wAn8Z3x5PRR9FEn+m1Kcl2xhSafvlN/ArPKG6n1Xp5Njtq9GH13Ya809upab17a83GK+lgv3oLn9qPtSM1rF0XNVWqWvfwFVOunXHqw1rfQqcniXbCXB5/M2cnPmmYekIQEuhejvW1KHySo+vDMqLf1qfNw808vyfgc3GWcp04dfk7EZxzU9mz7fr2bqaDqAAAAAAAAAAAAAAADIEZAZAZAjeAbwDfQDfQDfQDfQDfQDfQDeAneAwWu7JWN7mVehFVH/jU/o6ue9yXrfeyZreIuW+rLDcw9u51oald+jOtDPyO/3o9lO6hn3zj+UTcpx8f2p8mjXybH9ZeB7D6nHnC1qeNOvKP80DJ0213sE8m3OyYeiy2P1KM4zjGlRnBqUZ9Pnda7eEWKsXZmMpz8kU4C/E5xMRP3/Tpdk6nRw6dQVXHX6JylDe74tpM5dWjn9Ox2qNLRjS29y+VWAAAAAAAAIAARkCGwIcgKHUAolWAtSuQLUrwCzK/AtS1MC1LVgLb1gCn55ALWQK1q4FyOqgXY6kBejfAXY3YF2NwBcjWAuKoBUpAVJgTkABIAAAAAQAwBGAIaApcQKXTAtyogWpW4FqdmBYnYAWZaawLUtKYFt6QwKfmdgFo7ArjpDAuR0pgXoacwL0LEC9G0AuxtwLsaQFapgVqIEpATgCQJAAAAAAAAAAAEYAYAYAboEboDcQEbiAdGgHRoB0aAdGgG4gJ3AG6BO6AwAwAwBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k=' />
              <Comment.Content>
                <Comment.Author as='a'>{m.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{m.created_at}</div>
                </Comment.Metadata>
                <Comment.Text>{m.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          );
        })}
      </Comment.Group>
    </Messages>
  );
};

const messagesQuery = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;

export default graphql(messagesQuery, {
  variables: props => ({
    channelId: props.channelId
  })
})(MessageContainer);
