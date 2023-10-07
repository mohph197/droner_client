import OvenPlayer from 'ovenplayer';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useModalsContext } from '../hooks/useModalsContext';

const StreamModal = ({ streamURL }) => {
	useEffect(() => {
		const player = OvenPlayer.create('player', {
			autoStart: true,
			mute: true,
			controls: false,
			sources: [
				{
					type: 'webrtc',
					file: streamURL,
				},
			],
			events: {
				onReady: () => {
					console.log('Player is ready');
				},
				onPlay: () => {
					console.log('Player is playing');
				},
				onPause: () => {
					console.log('Player is paused');
				},
				onEnded: () => {
					console.log('Player is ended');
				},
				onError: (error) => {
					console.log('Player is error', error);
				},
			},
		});

		return () => {
			player.remove();
		};
	}, []);

	const { closeModal } = useModalsContext();

	return (
		<div className='relative rounded-xl overflow-hidden h-3/4 aspect-video isolate'>
			<button
				className='text-red-500 absolute left-0 top-0 z-10'
				onClick={closeModal}
			>
				CLOSE
			</button>
			<div id='player'></div>
		</div>
	);
};
StreamModal.propTypes = {
	streamURL: PropTypes.string.isRequired,
};

export default StreamModal;
