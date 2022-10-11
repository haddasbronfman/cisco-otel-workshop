const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { context, propagation, trace } = require('@opentelemetry/api');
const { SimpleSpanProcessor} = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');


diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

//create trace provider.
const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'Haddas-application'
    })
  });

//option to create console exporter
//const consoleExporter = new opentelemetry.tracing.ConsoleSpanExporter();

//create grpc otlp exporter
const exporter = new ZipkinExporter();
// const traceExporter = new OTLPTraceExporter({
//   url: 'http://localhost:4317'
//   //optionally put headers
// });

//put exported inside bacth processor
//put batch processor inside provider
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

registerInstrumentations({
    tracerProvider: provider, // optional, only if global TracerProvider shouldn't be used
    //meterProvider: meterProvider, // optional, only if global MeterProvider shouldn't be used
    instrumentations: [
        getNodeAutoInstrumentations(),
        //new HttpInstrumentation(),
    ],
});

//register the provider
provider.register(); //optinally supply contextManager and propagator