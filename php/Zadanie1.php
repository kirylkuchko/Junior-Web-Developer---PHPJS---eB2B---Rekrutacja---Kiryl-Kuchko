<?php

class PhoneKeyboardConverter {
	
	private $dictionary;
	
	//Ustawiłem wartości w słowniku na podstawie analizy częstotliwości liter w językach z użyciem alfabetu łacińskiego - https://www.researchgate.net/publication/324018661_Letter_Frequency_Analysis_of_Languages_Using_Latin_Alphabet
	//Co optymizuje kod, bo po znalezieniu wartości key lub value przeszukiwanie kończy się
	function __construct() {
		$this->dictionary = array(
			'33' => 'e',
			'2' => 'a',
			'8' => 't',
			'444' => 'i',
			'666' => 'o',
			'66' => 'n',
			'7777' => 's',
			'777' => 'r',
			'44' => 'h',
			'555' => 'l',
			'3' => 'd',
			'222' => 'c',
			'88' => 'u',
			'6' => 'm',
			'333' => 'f',
			'7' => 'p',
			'4' => 'g',
			'9' => 'w',
			'999' => 'y',
			'22' => 'b',
			'888' => 'v',
			'55' => 'k',
			'99' => 'x',
			'5' => 'j',
			'9999' => 'z',
			'77' => 'q', 
			'0' => ' '
		);
	}

	//W funkcjach są sprawdzenie na zgodność wartości z kluczem lub wartością, co wcale zapewnia potrzeby sprawdzenia warunków
	public function convertToNumeric($letter_string){
	
		$letter_array = str_split(strtolower($letter_string));
		$bool_if_first = true;
		$result_string = '';
	
		foreach ($letter_array as &$value) {
			if (in_array($value, $this->dictionary)) {
				if (!$bool_if_first) {
					$result_string =  $result_string . array_search($value, $this->dictionary) . ',';
				} else {
					$result_string = array_search($value, $this->dictionary) . ',';
					$bool_if_first = false;
				}	
			} else {
				return "$value - nieprawidłowa wartość";
			}
		}
		return rtrim($result_string, ',');
	}

	public function convertToString($number_string){
		$number_array = explode(',', $number_string);
		$result_string = '';
	
		foreach ($number_array as &$value) {
			if (array_key_exists($value, $this->dictionary)) {
				$result_string =  $result_string . $this->dictionary[$value];
			} else {
				return "$value - nieprawidłowa wartość";
			}
		}
	
		return rtrim($result_string, ',');	
	}
}

$converter = new PhoneKeyboardConverter();
echo $converter->convertToNumeric('Ela nie ma kota');
echo $converter->convertToString('5,2,22,555,33,222,9999,66,444,55');