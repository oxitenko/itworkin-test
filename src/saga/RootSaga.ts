import {call, put, takeEvery, delay} from "redux-saga/effects";
import axios, {AxiosResponse} from "axios";
import {getLocationFailure, getLocationSuccess} from "../redux/locationState";
import {SagaIterator} from "redux-saga";
import {getCharacterFailure, getCharacterSuccess} from "../redux/characterState";
import {ICharacter, ICharacterApiResponse, ILocation, ILocationApiResponse} from "../types";


function* workGetLocationFetch(): SagaIterator {
    try {
        const response: AxiosResponse<ILocationApiResponse> = yield call(() => axios.get("https://rickandmortyapi.com/api/location"));
        const location: ILocation[] = response.data.results;
        yield put(getLocationSuccess(location));
    } catch (e) {
        yield put(getLocationFailure(`Error: ${e}`));
    }
}

function* workGetCharacterFetch(): SagaIterator {
    try {
        const response: AxiosResponse<ICharacterApiResponse> = yield call(() => axios.get("https://rickandmortyapi.com/api/character"));
        const character: ICharacter[] = response.data.results;
        yield put(getCharacterSuccess(character));
    } catch (e) {
        yield put(getCharacterFailure(`Error: ${e}`));
    }
}

function* rootSaga(): SagaIterator {
    yield takeEvery("location/getLocationFetch", workGetLocationFetch);
    yield takeEvery("character/getCharacterFetch", workGetCharacterFetch);
}

export default rootSaga;