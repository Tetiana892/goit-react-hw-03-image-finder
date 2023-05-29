import axios from 'axios';

const KEY= '35202570-a98fb6affeab795733fe4a227';
axios.defaults.baseURL = 'https://pixabay.com/api'

export async function fetchImage(searchQuery, page) {
    const response = await axios.get(
      `?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        
    );
    return response.data;
}