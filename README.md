# Schedule-Typer

## Type Bus Schedules easier

Exports to JSON

```json
{
  "bushaltestelle": "TEst123",
  "zeiten": ["08:15", "|", "NULL", "08:55"]
}
```

Type Bus Schedules easier

Options:  
  -A, --about                   About  
  -S, --start [bushaltestelle]  Start the Input  
  -F, --file \<filename\>         Specific Output (default: "dist/answers.json")  
  -h, --help                    display help for command  

arguments inside [] are optional

## How to

Bushaltestelle: `enter the bus stop`  
Number: `enter the time (HH,MM)`  

## Infos

Shortcuts: N = `NULL`  
Allowed Characters other than (HH,MM): `N, |, X`  
Save: `X`  
Default: `dist/answers.json`  

All Keys are Case **INSENSITIVE**  
For easier numpad usage, HH,MM gets translated to HH:MM

## Argument examples

```schedule-typer -S Berlin -F lol/result.json```  
short for:  
```schedule-typer --start Berlin --file lol/result.json```