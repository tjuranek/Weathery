/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState, Fragment } from 'react';
import { CurrentConditions, Forecast } from '../components';
import { getWeatherForLocation } from '../services';

export const WeatherCard = props => {
	const { city, state } = props;

	const [componentState, setComponentState] = useState({
		weatherData: {},
		isLoading: true
	});

	useEffect(() => {
		const getWeather = async () => {
			const data = await getWeatherForLocation(city, state);
			setComponentState({
				...componentState,
				weatherData: { ...data },
				isLoading: false
			});
		};

		getWeather();
	}, [componentState]);

	const styles = {
		container: {
			border: '1px solid black'
		}
	};

	return (
		<div css={styles.container}>
			{componentState.isLoading ? (
				<p>loading</p>
			) : (
				<Fragment>
					<CurrentConditions
						currentConditions={
							componentState.weatherData.currentConditions
						}
					/>

					<Forecast forecast={componentState.weatherData.forecast} />
				</Fragment>
			)}
		</div>
	);
};
