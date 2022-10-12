const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor} = require('@opentelemetry/sdk-trace-base');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

// 1. create trace provider.
const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'Haddas-application'
  })
});

// 2. create exporter
const exporter = new ZipkinExporter();
// Other options: OTLPTraceExporter(), JaegerExporter(), ConsoleSpanExporter()

// 3. create processor. give it out exporter:
const processor = new SimpleSpanProcessor(exporter);
// Other options: BatchSpanProcessor()

// 4. add processor to provider
provider.addSpanProcessor(processor);

// 5. choose what we want to instrument
registerInstrumentations({
    tracerProvider: provider, // optional, only if global TracerProvider shouldn't be used
    instrumentations: [
        getNodeAutoInstrumentations(),
        // Other option is to give a list of instrumentations:
        //new HttpInstrumentation(), new MongoDBInstrumentation()
    ],
});

// 6. register the provider
provider.register();