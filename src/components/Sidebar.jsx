import React from 'react';
import { HStack } from '@chakra-ui/react';

function Sidebar() {
	const [selectedOption, setSelectedOption] = React.useState('Activity');
	const options = ['Units', 'Activity', 'Alerts'];
	return (
		<div className='px-9 py-4 bottom-0 w-96 h-[calc(100vh-41px)] border-r border-r-black'>
			<div className='flex justify-center gap-6'>
				{options.map((option) => (
					<HStack
						key={option}
						spacing={4}
						className={`${
							selectedOption === option && 'font-bold text-black'
						} cursor-pointer rounded-md`}
						onClick={() => setSelectedOption(option)}
					>
						<span>{option}</span>
					</HStack>
				))}
			</div>
		</div>
	);
}

export default Sidebar;
