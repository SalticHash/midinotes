!function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Tone = e() : t.Tone = e();
  }("undefined" != typeof self ? self : this, () => (() => {
    var t = {871: function (t, e, s) {
      !function (t, e, s, n) {
        "use strict";
        var i = function (t, e, s) {
          return {endTime: e, insertTime: s, type: "exponentialRampToValue", value: t};
        }, o = function (t, e, s) {
          return {endTime: e, insertTime: s, type: "linearRampToValue", value: t};
        }, r = function (t, e) {
          return {startTime: e, type: "setValue", value: t};
        }, a = function (t, e, s) {
          return {duration: s, startTime: e, type: "setValueCurve", values: t};
        }, c = function (t, e, s) {
          var n = s.startTime, i = s.target, o = s.timeConstant;
          return i + (e - i) * Math.exp((n - t) / o);
        }, f = function t(e, s, n, i) {
          var o = e[s];
          return undefined === o ? i : "exponentialRampToValue" === o.type || "linearRampToValue" === o.type || "setValue" === o.type ? o.value : "setValueCurve" === o.type ? o.values[o.values.length - 1] : c(n, t(e, s - 1, o.startTime, i), o);
        }, _ = function (t, e, s, n, i) {
          return undefined === s ? [n.insertTime, i] : "exponentialRampToValue" === s.type || "linearRampToValue" === s.type ? [s.endTime, s.value] : "setValue" === s.type ? [s.startTime, s.value] : "setValueCurve" === s.type ? [s.startTime + s.duration, s.values[s.values.length - 1]] : [s.startTime, f(t, e - 1, s.startTime, i)];
        }, v = function (t) {
          return "cancelAndHold" === t.type || "cancelScheduledValues" === t.type ? t.cancelTime : "exponentialRampToValue" === t.type || "linearRampToValue" === t.type ? t.endTime : t.startTime;
        }, y = function (t, e, s, n) {
          var i = n.endTime, o = n.value;
          return s === o ? o : 0 < s && 0 < o || s < 0 && o < 0 ? s * Math.pow(o / s, (t - e) / (i - e)) : 0;
        }, w = function (t, e) {
          var s = e.duration, n = e.startTime, i = e.values;
          return function (t, e) {
            var s = Math.floor(e), n = Math.ceil(e);
            return s === n ? t[s] : (1 - (e - s)) * t[s] + (1 - (n - e)) * t[n];
          }(i, (t - n) / s * (i.length - 1));
        }, T = function () {
          return n(function t(e) {
            s(this, t), this._automationEvents = [], this._currenTime = 0, this._defaultValue = e;
          }, [{key: Symbol.iterator, value: function () {
            return this._automationEvents[Symbol.iterator]();
          }}, {key: "add", value: function (t) {
            var e = v(t);
            if ("cancelAndHold" === t.type || "cancelScheduledValues" === t.type) {
              var s = this._automationEvents.findIndex(function (s) {
                return "cancelScheduledValues" === t.type && "setValueCurve" === s.type ? s.startTime + s.duration >= e : v(s) >= e;
              }), n = this._automationEvents[s];
              if (-1 !== s && (this._automationEvents = this._automationEvents.slice(0, s)), "cancelAndHold" === t.type) {
                var c = this._automationEvents[this._automationEvents.length - 1];
                if (undefined !== n && ("exponentialRampToValue" === n.type || "linearRampToValue" === n.type)) {
                  if (undefined !== c && "setTarget" === c.type) throw new Error("The internal list is malformed.");
                  var p = undefined === c ? n.insertTime : "setValueCurve" === c.type ? c.startTime + c.duration : v(c), f = undefined === c ? this._defaultValue : "setValueCurve" === c.type ? c.values[c.values.length - 1] : c.value, _ = "exponentialRampToValue" === n.type ? y(e, p, f, n) : f + (e - p) / (n.endTime - p) * (n.value - f), w = "exponentialRampToValue" === n.type ? i(_, e, this._currenTime) : o(_, e, this._currenTime);
                  this._automationEvents.push(w);
                }
                if (undefined !== c && "setTarget" === c.type && this._automationEvents.push(r(this.getValue(e), e)), undefined !== c && "setValueCurve" === c.type && c.startTime + c.duration > e) {
                  var T = e - c.startTime, S = (c.values.length - 1) / c.duration, k = Math.max(2, 1 + Math.ceil(T * S)), A = T / (k - 1) * S, C = c.values.slice(0, k);
                  if (A < 1) for (var O = 1; O < k; O += 1) {
                    var D = A * O % 1;
                    C[O] = c.values[O - 1] * (1 - D) + c.values[O] * D;
                  }
                  this._automationEvents[this._automationEvents.length - 1] = a(C, c.startTime, T);
                }
              }
            } else {
              var M = this._automationEvents.findIndex(function (t) {
                return v(t) > e;
              }), E = -1 === M ? this._automationEvents[this._automationEvents.length - 1] : this._automationEvents[M - 1];
              if (undefined !== E && "setValueCurve" === E.type && v(E) + E.duration > e) return false;
              var R = "exponentialRampToValue" === t.type ? i(t.value, t.endTime, this._currenTime) : "linearRampToValue" === t.type ? o(t.value, e, this._currenTime) : t;
              if (-1 === M) this._automationEvents.push(R); else {
                if ("setValueCurve" === t.type && e + t.duration > v(this._automationEvents[M])) return false;
                this._automationEvents.splice(M, 0, R);
              }
            }
            return true;
          }}, {key: "flush", value: function (t) {
            var e = this._automationEvents.findIndex(function (e) {
              return v(e) > t;
            });
            if (e > 1) {
              var s = this._automationEvents.slice(e - 1), n = s[0];
              "setTarget" === n.type && s.unshift(r(f(this._automationEvents, e - 2, n.startTime, this._defaultValue), n.startTime)), this._automationEvents = s;
            }
          }}, {key: "getValue", value: function (t) {
            if (0 === this._automationEvents.length) return this._defaultValue;
            var s = this._automationEvents.findIndex(function (e) {
              return v(e) > t;
            }), n = this._automationEvents[s], i = (-1 === s ? this._automationEvents.length : s) - 1, o = this._automationEvents[i];
            if (undefined !== o && "setTarget" === o.type && (undefined === n || !("exponentialRampToValue" === n.type || "linearRampToValue" === n.type) || n.insertTime > t)) return c(t, f(this._automationEvents, i - 1, o.startTime, this._defaultValue), o);
            if (undefined !== o && "setValue" === o.type && (undefined === n || !("exponentialRampToValue" === n.type || "linearRampToValue" === n.type))) return o.value;
            if (undefined !== o && "setValueCurve" === o.type && (undefined === n || !("exponentialRampToValue" === n.type || "linearRampToValue" === n.type) || o.startTime + o.duration > t)) return t < o.startTime + o.duration ? w(t, o) : o.values[o.values.length - 1];
            if (undefined !== o && ("exponentialRampToValue" === o.type || "linearRampToValue" === o.type) && (undefined === n || !("exponentialRampToValue" === n.type || "linearRampToValue" === n.type))) return o.value;
            if (undefined !== n && "exponentialRampToValue" === n.type) {
              var r = _(this._automationEvents, i, o, n, this._defaultValue), a = e(r, 2), m = a[0], g = a[1];
              return y(t, m, g, n);
            }
            if (undefined !== n && "linearRampToValue" === n.type) {
              var T = _(this._automationEvents, i, o, n, this._defaultValue), S = e(T, 2), k = S[0], A = S[1];
              return A + (t - k) / (n.endTime - k) * (n.value - A);
            }
            return this._defaultValue;
          }}]);
        }();
        t.AutomationEventList = T, t.createCancelAndHoldAutomationEvent = function (t) {
          return {cancelTime: t, type: "cancelAndHold"};
        }, t.createCancelScheduledValuesAutomationEvent = function (t) {
          return {cancelTime: t, type: "cancelScheduledValues"};
        }, t.createExponentialRampToValueAutomationEvent = function (t, e) {
          return {endTime: e, type: "exponentialRampToValue", value: t};
        }, t.createLinearRampToValueAutomationEvent = function (t, e) {
          return {endTime: e, type: "linearRampToValue", value: t};
        }, t.createSetTargetAutomationEvent = function (t, e, s) {
          return {startTime: e, target: t, timeConstant: s, type: "setTarget"};
        }, t.createSetValueAutomationEvent = r, t.createSetValueCurveAutomationEvent = a;
      }(e, s(821), s(805), s(989));
    }, 113: t => {
      t.exports = function (t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var s = 0, n = new Array(e); s < e; s++) n[s] = t[s];
        return n;
      }, t.exports.__esModule = true, t.exports.default = t.exports;
    }, 569: t => {
      t.exports = function (t) {
        if (Array.isArray(t)) return t;
      }, t.exports.__esModule = true, t.exports.default = t.exports;
    }, 805: t => {
      t.exports = function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }, t.exports.__esModule = true, t.exports.default = t.exports;
    }, 989: (t, e, s) => {
      var n = s(498);
      function i(t, e) {
        for (var s = 0; s < e.length; s++) {
          var i = e[s];
          i.enumerable = i.enumerable || false, i.configurable = true, "value" in i && (i.writable = true), Object.defineProperty(t, n(i.key), i);
        }
      }
      t.exports = function (t, e, s) {
        return e && i(t.prototype, e), s && i(t, s), Object.defineProperty(t, "prototype", {writable: false}), t;
      }, t.exports.__esModule = true, t.exports.default = t.exports;
    }, 474: t => {
      t.exports = function (t, e) {
        var s = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
        if (null != s) {
          var n, i, o, r, a = [], c = true, h = false;
          try {
            if (o = (s = s.call(t)).next, 0 === e) {
              if (Object(s) !== s) return;
              c = false;
            } else for (; !(c = (n = o.call(s)).done) && (a.push(n.value), a.length !== e); c = true) ;
          } catch (t) {
            h = true, i = t;
          } finally {
            try {
              if (!c && null != s.return && (r = s.return(), Object(r) !== r)) return;
            } finally {
              if (h) throw i;
            }
          }
          return a;
        }
      }, t.exports.__esModule = true, t.exports.default = t.exports;
    }, 18: t => {
      t.exports = function () {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }, t.exports.__esModule = true, t.exports.default = t.exports;
    }, 821: (t, e, s) => {
      var n = s(569), i = s(474), o = s(744), r = s(18);
      t.exports = function (t, e) {
        return n(t) || i(t, e) || o(t, e) || r();
      }, t.exports.__esModule = true, t.exports.default = t.exports;
    }, 327: (t, e, s) => {
      var n = s(564).default;
      t.exports = function (t, e) {
        if ("object" != n(t) || !t) return t;
        var s = t[Symbol.toPrimitive];
        if (undefined !== s) {
          var i = s.call(t, e || "default");
          if ("object" != n(i)) return i;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === e ? String : Number)(t);
      }, t.exports.__esModule = true, t.exports.default = t.exports;
    }, 498: (t, e, s) => {
      var n = s(564).default, i = s(327);
      t.exports = function (t) {
        var e = i(t, "string");
        return "symbol" == n(e) ? e : e + "";
      }, t.exports.__esModule = true, t.exports.default = t.exports;
    }, 564: t => {
      function e(s) {
        return t.exports = e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
          return typeof t;
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, t.exports.__esModule = true, t.exports.default = t.exports, e(s);
      }
      t.exports = e, t.exports.__esModule = true, t.exports.default = t.exports;
    }, 744: (t, e, s) => {
      var n = s(113);
      t.exports = function (t, e) {
        if (t) {
          if ("string" == typeof t) return n(t, e);
          var s = Object.prototype.toString.call(t).slice(8, -1);
          return "Object" === s && t.constructor && (s = t.constructor.name), "Map" === s || "Set" === s ? Array.from(t) : "Arguments" === s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s) ? n(t, e) : undefined;
        }
      }, t.exports.__esModule = true, t.exports.default = t.exports;
    }}, e = {};
    function s(n) {
      var i = e[n];
      if (undefined !== i) return i.exports;
      var o = e[n] = {exports: {}};
      return t[n].call(o.exports, o, o.exports, s), o.exports;
    }
    s.d = (t, e) => {
      for (var n in e) s.o(e, n) && !s.o(t, n) && Object.defineProperty(t, n, {enumerable: true, get: e[n]});
    }, s.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), s.r = t => {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: true});
    };
    var n = {};
    return (() => {
      "use strict";
      s.r(n), s.d(n, {AMOscillator: () => Ho, AMSynth: () => Or, Abs: () => dr, Add: () => ir, AmplitudeEnvelope: () => kr, Analyser: () => Ya, AudioToGain: () => Yo, AutoFilter: () => pa, AutoPanner: () => fa, AutoWah: () => ma, BaseContext: () => Ci, BiquadFilter: () => Dr, BitCrusher: () => va, Buffer: () => Oc, BufferSource: () => Mc, Buffers: () => Dc, Channel: () => nc, Chebyshev: () => xa, Chorus: () => ka, Clock: () => vo, Compressor: () => cc, Context: () => Oi, Convolver: () => fc, CrossFade: () => ha, DCMeter: () => Ka, Delay: () => yo, Destination: () => yc, Distortion: () => Aa, Draw: () => Sc, DuoSynth: () => qr, EQ3: () => dc, Emitter: () => Ai, Envelope: () => wr, FFT: () => Ja, FMOscillator: () => Jo, FMSynth: () => Ir, FatOscillator: () => tr, FeedbackCombFilter: () => Ur, FeedbackDelay: () => Oa, Filter: () => Mr, Follower: () => _a, Freeverb: () => qa, Frequency: () => Ji, FrequencyClass: () => Yi, FrequencyEnvelope: () => Er, FrequencyShifter: () => Ma, Gain: () => ho, GainToAudio: () => fr, Gate: () => hc, GrainPlayer: () => pr, GreaterThan: () => vr, GreaterThanZero: () => gr, IntervalTimeline: () => Mo, JCReverb: () => Na, LFO: () => ar, Limiter: () => lc, Listener: () => bc, Loop: () => Hr, LowpassCombFilter: () => Qr, Master: () => xc, MembraneSynth: () => Nr, Merge: () => ba, MetalSynth: () => Vr, Meter: () => Ha, MidSideCompressor: () => uc, MidSideMerge: () => Ua, MidSideSplit: () => Ba, Midi: () => Ao, MidiClass: () => ko, Mono: () => ic, MonoSynth: () => Rr, MultibandCompressor: () => pc, MultibandSplit: () => oc, Multiply: () => $o, Negate: () => _r, Noise: () => zo, NoiseSynth: () => Pr, Offline: () => To, OfflineContext: () => qi, OmniOscillator: () => nr, OnePoleFilter: () => Gr, Oscillator: () => Xo, PWMOscillator: () => er, PanVol: () => sc, Panner: () => da, Panner3D: () => rc, Param: () => no, Part: () => Jr, Pattern: () => aa, Phaser: () => za, PingPongDelay: () => ja, PitchShift: () => La, Player: () => lr, Players: () => ur, PluckSynth: () => Zr, PolySynth: () => Xr, Pow: () => Fo, PulseOscillator: () => Ko, Recorder: () => ac, Reverb: () => Wa, Sampler: () => Yr, Scale: () => or, ScaleExp: () => yr, Sequence: () => ca, Signal: () => po, Solo: () => ec, Split: () => wa, StateTimeline: () => so, StereoWidener: () => Qa, Subtract: () => mr, SyncedSignal: () => xr, Synth: () => Ar, Ticks: () => Oo, TicksClass: () => Co, Time: () => Xi, TimeClass: () => Zi, Timeline: () => wi, ToneAudioBuffer: () => Ri, ToneAudioBuffers: () => So, ToneAudioNode: () => io, ToneBufferSource: () => Lo, ToneEvent: () => $r, ToneOscillatorNode: () => Zo, Transport: () => gc, TransportTime: () => to, TransportTimeClass: () => Ki, Tremolo: () => Za, Unit: () => e, UserMedia: () => Go, Vibrato: () => Xa, Volume: () => xo, WaveShaper: () => Io, Waveform: () => tc, Zero: () => rr, connect: () => ro, connectSeries: () => oo, connectSignal: () => fo, context: () => Ac, dbToGain: () => ji, debug: () => t, defaultArg: () => pi, disconnect: () => ao, fanIn: () => co, ftom: () => Bi, gainToDb: () => Li, getContext: () => Vi, getDestination: () => wc, getDraw: () => kc, getListener: () => Tc, getTransport: () => vc, immediate: () => mc, intervalToFrequencyRatio: () => zi, isArray: () => Ln, isBoolean: () => jn, isDefined: () => Fn, isFunction: () => Vn, isNote: () => Wn, isNumber: () => Nn, isObject: () => Pn, isString: () => zn, isUndef: () => In, loaded: () => Cc, mtof: () => Gi, now: () => _c, optionsFromArguments: () => ui, setContext: () => Ni, start: () => Pi, supported: () => qn, version: () => i});
      var t = {};
      s.r(t), s.d(t, {assert: () => Bn, assertContextRunning: () => Gn, assertRange: () => Un, assertUsedScheduleTime: () => Yn, enterScheduledCallback: () => Xn, log: () => Jn, setLogger: () => Hn, warn: () => Kn});
      var e = {};
      s.r(e);
      const i = "15.0.4";
      var o = s(871);
      const r = new WeakSet, a = new WeakMap, c = new WeakMap, h = new WeakMap, l = new WeakMap, u = new WeakMap, p = new WeakMap, d = new WeakMap, f = new WeakMap, _ = new WeakMap, m = {construct: () => m}, g = /^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/, v = (t, e) => {
        const s = [];
        let n = t.replace(/^[\s]+/, ""), i = n.match(g);
        for (; null !== i;) {
          const t = i[1].slice(1, -1), o = i[0].replace(/([\s]+)?;?$/, "").replace(t, new URL(t, e).toString());
          s.push(o), n = n.slice(i[0].length).replace(/^[\s]+/, ""), i = n.match(g);
        }
        return [s.join(";"), n];
      }, y = t => {
        if (undefined !== t && !Array.isArray(t)) throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.");
      }, x = t => {
        if (!(t => {
          try {
            new new Proxy(t, m);
          } catch {
            return false;
          }
          return true;
        })(t)) throw new TypeError("The given value for processorCtor should be a constructor.");
        if (null === t.prototype || "object" != typeof t.prototype) throw new TypeError("The given value for processorCtor should have a prototype.");
      }, w = (t, e) => {
        const s = t.get(e);
        if (undefined === s) throw new Error("A value with the given key could not be found.");
        return s;
      }, b = (t, e) => {
        const s = Array.from(t).filter(e);
        if (s.length > 1) throw Error("More than one element was found.");
        if (0 === s.length) throw Error("No element was found.");
        const [n] = s;
        return t.delete(n), n;
      }, T = (t, e, s, n) => {
        const i = w(t, e), o = b(i, t => t[0] === s && t[1] === n);
        return 0 === i.size && t.delete(e), o;
      }, S = t => w(p, t), k = t => {
        if (r.has(t)) throw new Error("The AudioNode is already stored.");
        r.add(t), S(t).forEach(t => t(true));
      }, A = t => "port" in t, C = t => {
        if (!r.has(t)) throw new Error("The AudioNode is not stored.");
        r.delete(t), S(t).forEach(t => t(false));
      }, O = (t, e) => {
        !A(t) && e.every(t => 0 === t.size) && C(t);
      }, D = {channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", fftSize: 2048, maxDecibels: -30, minDecibels: -100, smoothingTimeConstant: 0.8}, M = (t, e) => t.context === e, E = t => {
        try {
          t.copyToChannel(new Float32Array(1), 0, -1);
        } catch {
          return false;
        }
        return true;
      }, R = () => new DOMException("", "IndexSizeError"), q = t => {
        var e;
        t.getChannelData = (e = t.getChannelData, s => {
          try {
            return e.call(t, s);
          } catch (t) {
            if (12 === t.code) throw R();
            throw t;
          }
        });
      }, I = {numberOfChannels: 1}, F = -3.4028234663852886e38, V = -F, N = t => r.has(t), P = {buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1}, j = t => w(a, t), L = t => w(h, t), z = (t, e) => {
        const {activeInputs: s} = j(t);
        s.forEach(s => s.forEach(([s]) => {
          e.includes(t) || z(s, [...e, t]);
        }));
        const n = (t => "playbackRate" in t)(t) ? [t.playbackRate] : A(t) ? Array.from(t.parameters.values()) : (t => "frequency" in t && "gain" in t)(t) ? [t.Q, t.detune, t.frequency, t.gain] : (t => "offset" in t)(t) ? [t.offset] : (t => !("frequency" in t) && "gain" in t)(t) ? [t.gain] : (t => "detune" in t && "frequency" in t)(t) ? [t.detune, t.frequency] : (t => "pan" in t)(t) ? [t.pan] : [];
        for (const t of n) {
          const s = L(t);
          undefined !== s && s.activeInputs.forEach(([t]) => z(t, e));
        }
        N(t) && C(t);
      }, W = t => {
        z(t.destination, []);
      }, B = t => "context" in t, U = t => B(t[0]), G = (t, e, s, n) => {
        for (const e of t) if (s(e)) {
          if (n) return false;
          throw Error("The set contains at least one similar element.");
        }
        return t.add(e), true;
      }, Q = (t, e, [s, n], i) => {
        G(t, [e, s, n], t => t[0] === e && t[1] === s, i);
      }, Z = (t, [e, s, n], i) => {
        const o = t.get(e);
        undefined === o ? t.set(e, new Set([[s, n]])) : G(o, [s, n], t => t[0] === s, i);
      }, X = t => "inputs" in t, Y = (t, e, s, n) => {
        if (X(e)) {
          const i = e.inputs[n];
          return t.connect(i, s, 0), [i, s, 0];
        }
        return t.connect(e, s, n), [e, s, n];
      }, $ = (t, e, s) => {
        for (const n of t) if (n[0] === e && n[1] === s) return t.delete(n), n;
        return null;
      }, H = (t, e) => {
        if (!S(t).delete(e)) throw new Error("Missing the expected event listener.");
      }, J = (t, e, s) => {
        const n = w(t, e), i = b(n, t => t[0] === s);
        return 0 === n.size && t.delete(e), i;
      }, K = (t, e, s, n) => {
        X(e) ? t.disconnect(e.inputs[n], s, 0) : t.disconnect(e, s, n);
      }, tt = t => w(c, t), et = t => w(l, t), st = t => d.has(t), nt = t => !r.has(t), it = (t, e) => new Promise(s => {
        if (null !== e) s(true); else {
          const e = t.createScriptProcessor(256, 1, 1), n = t.createGain(), i = t.createBuffer(1, 2, 44100), o = i.getChannelData(0);
          o[0] = 1, o[1] = 1;
          const r = t.createBufferSource();
          r.buffer = i, r.loop = true, r.connect(e).connect(t.destination), r.connect(n), r.disconnect(n), e.onaudioprocess = n => {
            const i = n.inputBuffer.getChannelData(0);
            Array.prototype.some.call(i, t => 1 === t) ? s(true) : s(false), r.stop(), e.onaudioprocess = null, r.disconnect(e), e.disconnect(t.destination);
          }, r.start();
        }
      }), ot = (t, e) => {
        const s = new Map;
        for (const e of t) for (const t of e) {
          const e = s.get(t);
          s.set(t, undefined === e ? 1 : e + 1);
        }
        s.forEach((t, s) => e(s, t));
      }, rt = t => "context" in t, at = t => {
        const e = new Map;
        t.connect = (t => (s, n = 0, i = 0) => {
          const o = rt(s) ? t(s, n, i) : t(s, n), r = e.get(s);
          return undefined === r ? e.set(s, [{input: i, output: n}]) : r.every(t => t.input !== i || t.output !== n) && r.push({input: i, output: n}), o;
        })(t.connect.bind(t)), t.disconnect = (s => (n, i, o) => {
          if (s.apply(t), undefined === n) e.clear(); else if ("number" == typeof n) for (const [t, s] of e) {
            const i = s.filter(t => t.output !== n);
            0 === i.length ? e.delete(t) : e.set(t, i);
          } else if (e.has(n)) if (undefined === i) e.delete(n); else {
            const t = e.get(n);
            if (undefined !== t) {
              const s = t.filter(t => t.output !== i && (t.input !== o || undefined === o));
              0 === s.length ? e.delete(n) : e.set(n, s);
            }
          }
          for (const [s, n] of e) n.forEach(e => {
            rt(s) ? t.connect(s, e.output, e.input) : t.connect(s, e.output);
          });
        })(t.disconnect);
      }, ct = (t, e, s, n, i) => {
        const [o, r] = ((t, e, s, n) => {
          const {activeInputs: i, passiveInputs: o} = j(e), r = $(i[n], t, s);
          return null === r ? [T(o, t, s, n)[2], false] : [r[2], true];
        })(t, s, n, i);
        if (null !== o && (H(t, o), !r || e || st(t) || K(tt(t), tt(s), n, i)), N(s)) {
          const {activeInputs: t} = j(s);
          O(s, t);
        }
      }, ht = (t, e, s, n) => {
        const [i, o] = ((t, e, s) => {
          const {activeInputs: n, passiveInputs: i} = L(e), o = $(n, t, s);
          return null === o ? [J(i, t, s)[1], false] : [o[2], true];
        })(t, s, n);
        null !== i && (H(t, i), !o || e || st(t) || tt(t).disconnect(et(s), n));
      };
      class lt {
        constructor(t) {
          this._map = new Map(t);
        }
        get size() {
          return this._map.size;
        }
        entries() {
          return this._map.entries();
        }
        forEach(t, e = null) {
          return this._map.forEach((s, n) => t.call(e, s, n, this));
        }
        get(t) {
          return this._map.get(t);
        }
        has(t) {
          return this._map.has(t);
        }
        keys() {
          return this._map.keys();
        }
        values() {
          return this._map.values();
        }
      }
      const ut = {channelCount: 2, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 1, numberOfOutputs: 1, parameterData: {}, processorOptions: {}};
      function pt(t, e, s, n, i) {
        if ("function" == typeof t.copyFromChannel) 0 === e[s].byteLength && (e[s] = new Float32Array(128)), t.copyFromChannel(e[s], n, i); else {
          const o = t.getChannelData(n);
          if (0 === e[s].byteLength) e[s] = o.slice(i, i + 128); else {
            const t = new Float32Array(o.buffer, i * Float32Array.BYTES_PER_ELEMENT, 128);
            e[s].set(t);
          }
        }
      }
      const dt = (t, e, s, n, i) => {
        "function" == typeof t.copyToChannel ? 0 !== e[s].byteLength && t.copyToChannel(e[s], n, i) : 0 !== e[s].byteLength && t.getChannelData(n).set(e[s], i);
      }, ft = (t, e) => {
        const s = [];
        for (let n = 0; n < t; n += 1) {
          const t = [], i = "number" == typeof e ? e : e[n];
          for (let e = 0; e < i; e += 1) t.push(new Float32Array(128));
          s.push(t);
        }
        return s;
      }, _t = async (t, e, s, n, i, o, r) => {
        const a = null === e ? 128 * Math.ceil(t.context.length / 128) : e.length, c = n.channelCount * n.numberOfInputs, h = i.reduce((t, e) => t + e, 0), l = 0 === h ? null : s.createBuffer(h, a, s.sampleRate);
        if (undefined === o) throw new Error("Missing the processor constructor.");
        const u = j(t), p = await ((t, e) => {
          const s = w(_, t), n = tt(e);
          return w(s, n);
        })(s, t), d = ft(n.numberOfInputs, n.channelCount), f = ft(n.numberOfOutputs, i), m = Array.from(t.parameters.keys()).reduce((t, e) => ({...t, [e]: new Float32Array(128)}), {});
        for (let h = 0; h < a; h += 128) {
          if (n.numberOfInputs > 0 && null !== e) for (let t = 0; t < n.numberOfInputs; t += 1) for (let s = 0; s < n.channelCount; s += 1) pt(e, d[t], s, s, h);
          undefined !== o.parameterDescriptors && null !== e && o.parameterDescriptors.forEach(({name: t}, s) => {
            pt(e, m, t, c + s, h);
          });
          for (let t = 0; t < n.numberOfInputs; t += 1) for (let e = 0; e < i[t]; e += 1) 0 === f[t][e].byteLength && (f[t][e] = new Float32Array(128));
          try {
            const t = d.map((t, e) => 0 === u.activeInputs[e].size ? [] : t), e = r(h / s.sampleRate, s.sampleRate, () => p.process(t, f, m));
            if (null !== l) for (let t = 0, e = 0; t < n.numberOfOutputs; t += 1) {
              for (let s = 0; s < i[t]; s += 1) dt(l, f[t], s, e + s, h);
              e += i[t];
            }
            if (!e) break;
          } catch (e) {
            t.dispatchEvent(new ErrorEvent("processorerror", {colno: e.colno, filename: e.filename, lineno: e.lineno, message: e.message}));
            break;
          }
        }
        return l;
      }, mt = {Q: 1, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", detune: 0, frequency: 350, gain: 0, type: "lowpass"}, gt = {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 6}, vt = {channelCount: 6, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: 6}, yt = {channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", offset: 1}, xt = {buffer: null, channelCount: 2, channelCountMode: "clamped-max", channelInterpretation: "speakers", disableNormalization: false}, wt = t => {
        const {port1: e, port2: s} = new MessageChannel;
        return new Promise(n => {
          const i = () => {
            s.onmessage = null, e.close(), s.close(), n();
          };
          s.onmessage = () => i();
          try {
            e.postMessage(t, [t]);
          } catch {} finally {
            i();
          }
        });
      }, bt = {channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", delayTime: 0, maxDelayTime: 1}, Tt = (t, e, s) => {
        const n = e[s];
        if (undefined === n) throw t();
        return n;
      }, St = {attack: 0.003, channelCount: 2, channelCountMode: "clamped-max", channelInterpretation: "speakers", knee: 30, ratio: 12, release: 0.25, threshold: -24}, kt = {channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", gain: 1}, At = () => new DOMException("", "InvalidStateError"), Ct = () => new DOMException("", "InvalidAccessError"), Ot = {channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers"}, Dt = (t, e, s, n, i, o, r, a, c, h, l) => {
        const u = h.length;
        let p = a;
        for (let a = 0; a < u; a += 1) {
          let u = s[0] * h[a];
          for (let e = 1; e < i; e += 1) {
            const n = p - e & c - 1;
            u += s[e] * o[n], u -= t[e] * r[n];
          }
          for (let t = i; t < n; t += 1) u += s[t] * o[p - t & c - 1];
          for (let s = i; s < e; s += 1) u -= t[s] * r[p - s & c - 1];
          o[p] = h[a], r[p] = u, p = p + 1 & c - 1, l[a] = u;
        }
        return p;
      }, Mt = {channelCount: 2, channelCountMode: "explicit", channelInterpretation: "speakers"}, Et = t => {
        const e = new Uint32Array([1179011410, 40, 1163280727, 544501094, 16, 131073, 44100, 176400, 1048580, 1635017060, 4, 0]);
        try {
          const s = t.decodeAudioData(e.buffer, () => {});
          return undefined !== s && (s.catch(() => {}), true);
        } catch {}
        return false;
      }, Rt = (t, e, s) => {
        const n = e[s];
        undefined !== n && n !== t[s] && (t[s] = n);
      }, qt = (t, e) => {
        Rt(t, e, "channelCount"), Rt(t, e, "channelCountMode"), Rt(t, e, "channelInterpretation");
      }, It = t => "function" == typeof t.getFloatTimeDomainData, Ft = (t, e, s) => {
        const n = e[s];
        undefined !== n && n !== t[s].value && (t[s].value = n);
      }, Vt = t => {
        t.start = (e => (s = 0, n = 0, i) => {
          if ("number" == typeof i && i < 0 || n < 0 || s < 0) throw new RangeError("The parameters can't be negative.");
          e.call(t, s, n, i);
        })(t.start);
      }, Nt = t => {
        var e;
        t.stop = (e = t.stop, (s = 0) => {
          if (s < 0) throw new RangeError("The parameter can't be negative.");
          e.call(t, s);
        });
      }, Pt = (t, e) => null === t ? 512 : Math.max(512, Math.min(16384, Math.pow(2, Math.round(Math.log2(t * e))))), jt = (t, e) => {
        const s = t.createBiquadFilter();
        return qt(s, e), Ft(s, e, "Q"), Ft(s, e, "detune"), Ft(s, e, "frequency"), Ft(s, e, "gain"), Rt(s, e, "type"), s;
      }, Lt = (t, e) => {
        const s = t.createChannelSplitter(e.numberOfOutputs);
        return qt(s, e), (t => {
          const e = t.numberOfOutputs;
          Object.defineProperty(t, "channelCount", {get: () => e, set: t => {
            if (t !== e) throw At();
          }}), Object.defineProperty(t, "channelCountMode", {get: () => "explicit", set: t => {
            if ("explicit" !== t) throw At();
          }}), Object.defineProperty(t, "channelInterpretation", {get: () => "discrete", set: t => {
            if ("discrete" !== t) throw At();
          }});
        })(s), s;
      }, zt = (t, e) => (t.connect = e.connect.bind(e), t.disconnect = e.disconnect.bind(e), t), Wt = (t, e) => {
        const s = t.createDelay(e.maxDelayTime);
        return qt(s, e), Ft(s, e, "delayTime"), s;
      }, Bt = (t, e) => {
        const s = t.createGain();
        return qt(s, e), Ft(s, e, "gain"), s;
      };
      function Ut(t, e) {
        const s = e[0] * e[0] + e[1] * e[1];
        return [(t[0] * e[0] + t[1] * e[1]) / s, (t[1] * e[0] - t[0] * e[1]) / s];
      }
      function Gt(t, e) {
        let s = [0, 0];
        for (let o = t.length - 1; o >= 0; o -= 1) i = e, s = [(n = s)[0] * i[0] - n[1] * i[1], n[0] * i[1] + n[1] * i[0]], s[0] += t[o];
        var n, i;
        return s;
      }
      const Qt = (t, e, s, n) => t.createScriptProcessor(e, s, n), Zt = () => new DOMException("", "NotSupportedError"), Xt = {numberOfChannels: 1}, Yt = {channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", detune: 0, frequency: 440, periodicWave: undefined, type: "sine"}, $t = {channelCount: 2, channelCountMode: "clamped-max", channelInterpretation: "speakers", coneInnerAngle: 360, coneOuterAngle: 360, coneOuterGain: 0, distanceModel: "inverse", maxDistance: 1e4, orientationX: 1, orientationY: 0, orientationZ: 0, panningModel: "equalpower", positionX: 0, positionY: 0, positionZ: 0, refDistance: 1, rolloffFactor: 1}, Ht = {disableNormalization: false}, Jt = {channelCount: 2, channelCountMode: "explicit", channelInterpretation: "speakers", pan: 0}, Kt = () => new DOMException("", "UnknownError"), te = {channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", curve: null, oversample: "none"}, ee = (t, e, s) => undefined === t.copyFromChannel ? t.getChannelData(s)[0] : (t.copyFromChannel(e, s), e[0]), se = t => {
        if (null === t) return false;
        const e = t.length;
        return e % 2 != 0 ? 0 !== t[Math.floor(e / 2)] : t[e / 2 - 1] + t[e / 2] !== 0;
      }, ne = (t, e, s, n) => {
        let i = t;
        for (; !i.hasOwnProperty(e);) i = Object.getPrototypeOf(i);
        const {get: o, set: r} = Object.getOwnPropertyDescriptor(i, e);
        Object.defineProperty(t, e, {get: s(o), set: n(r)});
      }, ie = (t, e, s) => {
        try {
          t.setValueAtTime(e, s);
        } catch (n) {
          if (9 !== n.code) throw n;
          ie(t, e, s + 1e-7);
        }
      }, oe = t => {
        const e = t.createOscillator();
        try {
          e.start(-1);
        } catch (t) {
          return t instanceof RangeError;
        }
        return false;
      }, re = t => {
        const e = t.createBuffer(1, 1, 44100), s = t.createBufferSource();
        s.buffer = e, s.start(), s.stop();
        try {
          return s.stop(), true;
        } catch {
          return false;
        }
      }, ae = t => {
        const e = t.createOscillator();
        try {
          e.stop(-1);
        } catch (t) {
          return t instanceof RangeError;
        }
        return false;
      }, ce = () => {
        try {
          new DOMException;
        } catch {
          return false;
        }
        return true;
      }, he = () => new Promise(t => {
        const e = new ArrayBuffer(0), {port1: s, port2: n} = new MessageChannel;
        s.onmessage = ({data: e}) => t(null !== e), n.postMessage(e, [e]);
      }), le = (t, e) => {
        const s = e.createGain();
        t.connect(s);
        const n = (e => () => {
          e.call(t, s), t.removeEventListener("ended", n);
        })(t.disconnect);
        t.addEventListener("ended", n), zt(t, s), t.stop = (e => {
          let n = false;
          return (i = 0) => {
            if (n) try {
              e.call(t, i);
            } catch {
              s.gain.setValueAtTime(0, i);
            } else e.call(t, i), n = true;
          };
        })(t.stop);
      }, ue = (t, e) => s => {
        const n = {value: t};
        return Object.defineProperties(s, {currentTarget: n, target: n}), "function" == typeof e ? e.call(t, s) : e.handleEvent.call(t, s);
      }, pe = (t => (e, s, [n, i, o], r) => {
        t(e[i], [s, n, o], t => t[0] === s && t[1] === n, r);
      })(G), de = (t => (e, s, [n, i, o], r) => {
        const a = e.get(n);
        undefined === a ? e.set(n, new Set([[i, s, o]])) : t(a, [i, s, o], t => t[0] === i && t[1] === s, r);
      })(G), fe = (t => (e, s, n, i) => t(e[i], t => t[0] === s && t[1] === n))(b), _e = new WeakMap, me = (t => e => {
        var s;
        return null !== (s = t.get(e)) && undefined !== s ? s : 0;
      })(_e), ge = (ve = new Map, ye = new WeakMap, (t, e) => {
        const s = ye.get(t);
        if (undefined !== s) return s;
        const n = ve.get(t);
        if (undefined !== n) return n;
        try {
          const s = e();
          return s instanceof Promise ? (ve.set(t, s), s.catch(() => false).then(e => (ve.delete(t), ye.set(t, e), e))) : (ye.set(t, s), s);
        } catch {
          return ye.set(t, false), false;
        }
      });
      var ve, ye;
      const xe = "undefined" == typeof window ? null : window, we = ((t, e) => (s, n) => {
        const i = s.createAnalyser();
        if (qt(i, n), !(n.maxDecibels > n.minDecibels)) throw e();
        return Rt(i, n, "fftSize"), Rt(i, n, "maxDecibels"), Rt(i, n, "minDecibels"), Rt(i, n, "smoothingTimeConstant"), t(It, () => It(i)) || (t => {
          t.getFloatTimeDomainData = e => {
            const s = new Uint8Array(e.length);
            t.getByteTimeDomainData(s);
            const n = Math.max(s.length, t.fftSize);
            for (let t = 0; t < n; t += 1) e[t] = 0.0078125 * (s[t] - 128);
            return e;
          };
        })(i), i;
      })(ge, R), be = (t => e => {
        const s = t(e);
        if (null === s.renderer) throw new Error("Missing the renderer of the given AudioNode in the audio graph.");
        return s.renderer;
      })(j), Te = ((t, e, s) => async (n, i, o) => {
        const r = t(n);
        await Promise.all(r.activeInputs.map((t, r) => Array.from(t).map(async ([t, a]) => {
          const c = e(t), h = await c.render(t, i), l = n.context.destination;
          s(t) || n === l && s(n) || h.connect(o, a, r);
        })).reduce((t, e) => [...t, ...e], []));
      })(j, be, st), Se = ((t, e, s) => () => {
        const n = new WeakMap;
        return {render(i, o) {
          const r = n.get(o);
          return undefined !== r ? Promise.resolve(r) : (async (i, o) => {
            let r = e(i);
            if (!M(r, o)) {
              const e = {channelCount: r.channelCount, channelCountMode: r.channelCountMode, channelInterpretation: r.channelInterpretation, fftSize: r.fftSize, maxDecibels: r.maxDecibels, minDecibels: r.minDecibels, smoothingTimeConstant: r.smoothingTimeConstant};
              r = t(o, e);
            }
            return n.set(o, r), await s(i, o, r), r;
          })(i, o);
        }};
      })(we, tt, Te), ke = (Ae = u, t => {
        const e = Ae.get(t);
        if (undefined === e) throw At();
        return e;
      });
      var Ae;
      const Ce = (t => null === t ? null : t.hasOwnProperty("OfflineAudioContext") ? t.OfflineAudioContext : t.hasOwnProperty("webkitOfflineAudioContext") ? t.webkitOfflineAudioContext : null)(xe), Oe = (t => e => null !== t && e instanceof t)(Ce), De = new WeakMap, Me = (t => class {
        constructor(t) {
          this._nativeEventTarget = t, this._listeners = new WeakMap;
        }
        addEventListener(e, s, n) {
          if (null !== s) {
            let i = this._listeners.get(s);
            undefined === i && (i = t(this, s), "function" == typeof s && this._listeners.set(s, i)), this._nativeEventTarget.addEventListener(e, i, n);
          }
        }
        dispatchEvent(t) {
          return this._nativeEventTarget.dispatchEvent(t);
        }
        removeEventListener(t, e, s) {
          const n = null === e ? undefined : this._listeners.get(e);
          this._nativeEventTarget.removeEventListener(t, undefined === n ? null : n, s);
        }
      })(ue), Ee = (t => null === t ? null : t.hasOwnProperty("AudioContext") ? t.AudioContext : t.hasOwnProperty("webkitAudioContext") ? t.webkitAudioContext : null)(xe), Re = (t => e => null !== t && e instanceof t)(Ee), qe = (t => e => null !== t && "function" == typeof t.AudioNode && e instanceof t.AudioNode)(xe), Ie = (t => e => null !== t && "function" == typeof t.AudioParam && e instanceof t.AudioParam)(xe), Fe = (t => null === t ? null : t.hasOwnProperty("AudioWorkletNode") ? t.AudioWorkletNode : null)(xe), Ve = ((t, e, s, n, i, o, r, a, h, l, u, d, f, _, m, g) => class extends l {
        constructor(e, n, i, o) {
          super(i), this._context = e, this._nativeAudioNode = i;
          const r = u(e);
          d(r) && true !== s(it, () => it(r, g)) && at(i), c.set(this, i), p.set(this, new Set), "closed" !== e.state && n && k(this), t(this, o, i);
        }
        get channelCount() {
          return this._nativeAudioNode.channelCount;
        }
        set channelCount (t) {
          this._nativeAudioNode.channelCount = t;
        }
        get channelCountMode() {
          return this._nativeAudioNode.channelCountMode;
        }
        set channelCountMode (t) {
          this._nativeAudioNode.channelCountMode = t;
        }
        get channelInterpretation() {
          return this._nativeAudioNode.channelInterpretation;
        }
        set channelInterpretation (t) {
          this._nativeAudioNode.channelInterpretation = t;
        }
        get context() {
          return this._context;
        }
        get numberOfInputs() {
          return this._nativeAudioNode.numberOfInputs;
        }
        get numberOfOutputs() {
          return this._nativeAudioNode.numberOfOutputs;
        }
        connect(t, s = 0, a = 0) {
          if (s < 0 || s >= this._nativeAudioNode.numberOfOutputs) throw i();
          const c = u(this._context), l = m(c);
          if (f(t) || _(t)) throw o();
          if (B(t)) {
            const i = tt(t);
            try {
              const e = Y(this._nativeAudioNode, i, s, a), n = nt(this);
              (l || n) && this._nativeAudioNode.disconnect(...e), "closed" !== this.context.state && !n && nt(t) && k(t);
            } catch (t) {
              if (12 === t.code) throw o();
              throw t;
            }
            if (e(this, t, s, a, l)) {
              const e = h([this], t);
              ot(e, n(l));
            }
            return t;
          }
          const p = et(t);
          if ("playbackRate" === p.name && 1024 === p.maxValue) throw r();
          try {
            this._nativeAudioNode.connect(p, s), (l || nt(this)) && this._nativeAudioNode.disconnect(p, s);
          } catch (t) {
            if (12 === t.code) throw o();
            throw t;
          }
          if (((t, e, s, n) => {
            const {activeInputs: i, passiveInputs: o} = L(e), {outputs: r} = j(t), a = S(t), c = r => {
              const a = tt(t), c = et(e);
              if (r) {
                const e = J(o, t, s);
                Q(i, t, e, false), n || st(t) || a.connect(c, s);
              } else {
                const e = ((t, e, s) => b(t, t => t[0] === e && t[1] === s))(i, t, s);
                Z(o, e, false), n || st(t) || a.disconnect(c, s);
              }
            };
            return !!G(r, [e, s], t => t[0] === e && t[1] === s, true) && (a.add(c), N(t) ? Q(i, t, [s, c], true) : Z(o, [t, s, c], true), true);
          })(this, t, s, l)) {
            const e = h([this], t);
            ot(e, n(l));
          }
        }
        disconnect(t, e, s) {
          let n;
          const r = u(this._context), c = m(r);
          if (undefined === t) n = ((t, e) => {
            const s = j(t), n = [];
            for (const i of s.outputs) U(i) ? ct(t, e, ...i) : ht(t, e, ...i), n.push(i[0]);
            return s.outputs.clear(), n;
          })(this, c); else if ("number" == typeof t) {
            if (t < 0 || t >= this.numberOfOutputs) throw i();
            n = ((t, e, s) => {
              const n = j(t), i = [];
              for (const o of n.outputs) o[1] === s && (U(o) ? ct(t, e, ...o) : ht(t, e, ...o), i.push(o[0]), n.outputs.delete(o));
              return i;
            })(this, c, t);
          } else {
            if (undefined !== e && (e < 0 || e >= this.numberOfOutputs)) throw i();
            if (B(t) && undefined !== s && (s < 0 || s >= t.numberOfInputs)) throw i();
            if (n = ((t, e, s, n, i) => {
              const o = j(t);
              return Array.from(o.outputs).filter(t => !(t[0] !== s || undefined !== n && t[1] !== n || undefined !== i && t[2] !== i)).map(s => (U(s) ? ct(t, e, ...s) : ht(t, e, ...s), o.outputs.delete(s), s[0]));
            })(this, c, t, e, s), 0 === n.length) throw o();
          }
          for (const t of n) {
            const e = h([this], t);
            ot(e, a);
          }
        }
      })((Ne = a, (t, e, s) => {
        const n = [];
        for (let t = 0; t < s.numberOfInputs; t += 1) n.push(new Set);
        Ne.set(t, {activeInputs: n, outputs: new Set, passiveInputs: new WeakMap, renderer: e});
      }), ((t, e, s, n, i, o, r, a, c, h, l, u, p) => {
        const d = new WeakMap;
        return (f, _, m, g, v) => {
          const {activeInputs: y, passiveInputs: x} = o(_), {outputs: w} = o(f), b = a(f), S = o => {
            const a = c(_), h = c(f);
            if (o) {
              const e = T(x, f, m, g);
              t(y, f, e, false), v || u(f) || s(h, a, m, g), p(_) && k(_);
            } else {
              const t = n(y, f, m, g);
              e(x, g, t, false), v || u(f) || i(h, a, m, g);
              const s = r(_);
              if (0 === s) l(_) && O(_, y); else {
                const t = d.get(_);
                undefined !== t && clearTimeout(t), d.set(_, setTimeout(() => {
                  l(_) && O(_, y);
                }, 1e3 * s));
              }
            }
          };
          return !!h(w, [_, m, g], t => t[0] === _ && t[1] === m && t[2] === g, true) && (b.add(S), l(f) ? t(y, f, [m, g, S], true) : e(x, g, [f, m, S], true), true);
        };
      })(pe, de, Y, fe, K, j, me, S, tt, G, N, st, nt), ge, ((t, e, s, n, i, o) => r => (a, c) => {
        const h = t.get(a);
        if (undefined === h) {
          if (!r && o(a)) {
            const t = n(a), {outputs: o} = s(a);
            for (const s of o) if (U(s)) {
              const i = n(s[0]);
              e(t, i, s[1], s[2]);
            } else {
              const e = i(s[0]);
              t.disconnect(e, s[1]);
            }
          }
          t.set(a, c);
        } else t.set(a, h + c);
      })(d, K, j, tt, et, N), R, Ct, Zt, ((t, e, s, n, i, o, r, a) => (c, h) => {
        const l = e.get(c);
        if (undefined === l) throw new Error("Missing the expected cycle count.");
        const u = o(c.context), p = a(u);
        if (l === h) {
          if (e.delete(c), !p && r(c)) {
            const e = n(c), {outputs: o} = s(c);
            for (const s of o) if (U(s)) {
              const i = n(s[0]);
              t(e, i, s[1], s[2]);
            } else {
              const t = i(s[0]);
              e.connect(t, s[1]);
            }
          }
        } else e.set(c, l - h);
      })(Y, d, j, tt, et, ke, N, Oe), ((t, e, s) => function n(i, o) {
        const r = B(o) ? o : s(t, o);
        if ((t => "delayTime" in t)(r)) return [];
        if (i[0] === r) return [i];
        if (i.includes(r)) return [];
        const {outputs: a} = e(r);
        return Array.from(a).map(t => n([...i, r], t[0])).reduce((t, e) => t.concat(e), []);
      })(De, j, w), Me, ke, Re, qe, Ie, Oe, Fe);
      var Ne;
      const Pe = ((t, e, s, n, i, o) => class extends t {
        constructor(t, s) {
          const r = i(t), a = {...D, ...s}, c = n(r, a);
          super(t, false, c, o(r) ? e() : null), this._nativeAnalyserNode = c;
        }
        get fftSize() {
          return this._nativeAnalyserNode.fftSize;
        }
        set fftSize (t) {
          this._nativeAnalyserNode.fftSize = t;
        }
        get frequencyBinCount() {
          return this._nativeAnalyserNode.frequencyBinCount;
        }
        get maxDecibels() {
          return this._nativeAnalyserNode.maxDecibels;
        }
        set maxDecibels (t) {
          const e = this._nativeAnalyserNode.maxDecibels;
          if (this._nativeAnalyserNode.maxDecibels = t, !(t > this._nativeAnalyserNode.minDecibels)) throw this._nativeAnalyserNode.maxDecibels = e, s();
        }
        get minDecibels() {
          return this._nativeAnalyserNode.minDecibels;
        }
        set minDecibels (t) {
          const e = this._nativeAnalyserNode.minDecibels;
          if (this._nativeAnalyserNode.minDecibels = t, !(this._nativeAnalyserNode.maxDecibels > t)) throw this._nativeAnalyserNode.minDecibels = e, s();
        }
        get smoothingTimeConstant() {
          return this._nativeAnalyserNode.smoothingTimeConstant;
        }
        set smoothingTimeConstant (t) {
          this._nativeAnalyserNode.smoothingTimeConstant = t;
        }
        getByteFrequencyData(t) {
          this._nativeAnalyserNode.getByteFrequencyData(t);
        }
        getByteTimeDomainData(t) {
          this._nativeAnalyserNode.getByteTimeDomainData(t);
        }
        getFloatFrequencyData(t) {
          this._nativeAnalyserNode.getFloatFrequencyData(t);
        }
        getFloatTimeDomainData(t) {
          this._nativeAnalyserNode.getFloatTimeDomainData(t);
        }
      })(Ve, Se, R, we, ke, Oe), je = new WeakSet, Le = (t => null === t ? null : t.hasOwnProperty("AudioBuffer") ? t.AudioBuffer : null)(xe), ze = (We = new Uint32Array(1), t => (We[0] = t, We[0]));
      var We;
      const Be = ((t, e) => s => {
        s.copyFromChannel = (n, i, o = 0) => {
          const r = t(o), a = t(i);
          if (a >= s.numberOfChannels) throw e();
          const c = s.length, h = s.getChannelData(a), l = n.length;
          for (let t = r < 0 ? -r : 0; t + r < c && t < l; t += 1) n[t] = h[t + r];
        }, s.copyToChannel = (n, i, o = 0) => {
          const r = t(o), a = t(i);
          if (a >= s.numberOfChannels) throw e();
          const c = s.length, h = s.getChannelData(a), l = n.length;
          for (let t = r < 0 ? -r : 0; t + r < c && t < l; t += 1) h[t + r] = n[t];
        };
      })(ze, R), Ue = (t => e => {
        e.copyFromChannel = (s => (n, i, o = 0) => {
          const r = t(o), a = t(i);
          if (r < e.length) return s.call(e, n, a, r);
        })(e.copyFromChannel), e.copyToChannel = (s => (n, i, o = 0) => {
          const r = t(o), a = t(i);
          if (r < e.length) return s.call(e, n, a, r);
        })(e.copyToChannel);
      })(ze), Ge = ((t, e, s, n, i, o, r, a) => {
        let c = null;
        return class h {
          constructor(h) {
            if (null === i) throw new Error("Missing the native OfflineAudioContext constructor.");
            const {length: l, numberOfChannels: u, sampleRate: p} = {...I, ...h};
            null === c && (c = new i(1, 1, 44100));
            const d = null !== n && e(o, o) ? new n({length: l, numberOfChannels: u, sampleRate: p}) : c.createBuffer(u, l, p);
            if (0 === d.numberOfChannels) throw s();
            return "function" != typeof d.copyFromChannel ? (r(d), q(d)) : e(E, () => E(d)) || a(d), t.add(d), d;
          }
          static [Symbol.hasInstance](e) {
            return null !== e && "object" == typeof e && Object.getPrototypeOf(e) === h.prototype || t.has(e);
          }
        };
      })(je, ge, Zt, Le, Ce, (t => () => {
        if (null === t) return false;
        try {
          new t({length: 1, sampleRate: 44100});
        } catch {
          return false;
        }
        return true;
      })(Le), Be, Ue), Qe = (t => (e, s) => {
        const n = t(e, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0});
        s.connect(n).connect(e.destination);
        const i = () => {
          s.removeEventListener("ended", i), s.disconnect(n), n.disconnect();
        };
        s.addEventListener("ended", i);
      })(Bt), Ze = ((t, e, s) => async (n, i, o) => {
        const r = e(n);
        await Promise.all(Array.from(r.activeInputs).map(async ([e, n]) => {
          const r = t(e), a = await r.render(e, i);
          s(e) || a.connect(o, n);
        }));
      })(be, L, st), Xe = (t => (e, s, n) => t(s, e, n))(Ze), Ye = ((t, e, s, n, i, o, r, a, c, h, l) => (c, u) => {
        const p = c.createBufferSource();
        return qt(p, u), Ft(p, u, "playbackRate"), Rt(p, u, "buffer"), Rt(p, u, "loop"), Rt(p, u, "loopEnd"), Rt(p, u, "loopStart"), e(s, () => s(c)) || (t => {
          t.start = (e => {
            let s = false;
            return (n = 0, i = 0, o) => {
              if (s) throw At();
              e.call(t, n, i, o), s = true;
            };
          })(t.start);
        })(p), e(n, () => n(c)) || (t => {
          t.start = (e => (s = 0, n = 0, i) => {
            const o = t.buffer, r = null === o ? n : Math.min(o.duration, n);
            null !== o && r > o.duration - 0.5 / t.context.sampleRate ? e.call(t, s, 0, 0) : e.call(t, s, r, i);
          })(t.start);
        })(p), e(i, () => i(c)) || h(p, c), e(o, () => o(c)) || Vt(p), e(r, () => r(c)) || l(p, c), e(a, () => a(c)) || Nt(p), t(c, p), p;
      })(Qe, ge, t => {
        const e = t.createBufferSource();
        e.start();
        try {
          e.start();
        } catch {
          return true;
        }
        return false;
      }, t => {
        const e = t.createBufferSource(), s = t.createBuffer(1, 1, 44100);
        e.buffer = s;
        try {
          e.start(0, 1);
        } catch {
          return false;
        }
        return true;
      }, t => {
        const e = t.createBufferSource();
        e.start();
        try {
          e.stop();
        } catch {
          return false;
        }
        return true;
      }, oe, re, ae, 0, (t => (e, s) => {
        const n = s.createBuffer(1, 1, 44100);
        null === e.buffer && (e.buffer = n), t(e, "buffer", t => () => {
          const s = t.call(e);
          return s === n ? null : s;
        }, t => s => t.call(e, null === s ? n : s));
      })(ne), le), $e = ((t, e) => (s, n, i) => (t(n).replay(i), e(n, s, i)))((t => e => {
        const s = t(e);
        if (null === s.renderer) throw new Error("Missing the renderer of the given AudioParam in the audio graph.");
        return s.renderer;
      })(L), Ze), He = ((t, e, s, n, i) => () => {
        const o = new WeakMap;
        let r = null, a = null;
        return {set start (t) {
          r = t;
        }, set stop (t) {
          a = t;
        }, render(c, h) {
          const l = o.get(h);
          return undefined !== l ? Promise.resolve(l) : (async (c, h) => {
            let l = s(c);
            const u = M(l, h);
            if (!u) {
              const t = {buffer: l.buffer, channelCount: l.channelCount, channelCountMode: l.channelCountMode, channelInterpretation: l.channelInterpretation, loop: l.loop, loopEnd: l.loopEnd, loopStart: l.loopStart, playbackRate: l.playbackRate.value};
              l = e(h, t), null !== r && l.start(...r), null !== a && l.stop(a);
            }
            return o.set(h, l), u ? await t(h, c.playbackRate, l.playbackRate) : await n(h, c.playbackRate, l.playbackRate), await i(c, h, l), l;
          })(c, h);
        }};
      })(Xe, Ye, tt, $e, Te), Je = ((t, e, s, n, i, r, a, c, h, l, u, p, d) => (n, f, _, m = null, g = null) => {
        const v = _.value, y = new o.AutomationEventList(v), x = f ? (t => ({replay(e) {
          for (const s of t) if ("exponentialRampToValue" === s.type) {
            const {endTime: t, value: n} = s;
            e.exponentialRampToValueAtTime(n, t);
          } else if ("linearRampToValue" === s.type) {
            const {endTime: t, value: n} = s;
            e.linearRampToValueAtTime(n, t);
          } else if ("setTarget" === s.type) {
            const {startTime: t, target: n, timeConstant: i} = s;
            e.setTargetAtTime(n, t, i);
          } else if ("setValue" === s.type) {
            const {startTime: t, value: n} = s;
            e.setValueAtTime(n, t);
          } else {
            if ("setValueCurve" !== s.type) throw new Error("Can't apply an unknown automation.");
            {
              const {duration: t, startTime: n, values: i} = s;
              e.setValueCurveAtTime(i, n, t);
            }
          }
        }}))(y) : null, w = {get defaultValue() {
          return v;
        }, get maxValue() {
          return null === m ? _.maxValue : m;
        }, get minValue() {
          return null === g ? _.minValue : g;
        }, get value() {
          return _.value;
        }, set value (t) {
          _.value = t, w.setValueAtTime(t, n.context.currentTime);
        }, cancelAndHoldAtTime(t) {
          if ("function" == typeof _.cancelAndHoldAtTime) null === x && y.flush(n.context.currentTime), y.add(i(t)), _.cancelAndHoldAtTime(t); else {
            const e = Array.from(y).pop();
            null === x && y.flush(n.context.currentTime), y.add(i(t));
            const s = Array.from(y).pop();
            _.cancelScheduledValues(t), e !== s && undefined !== s && ("exponentialRampToValue" === s.type ? _.exponentialRampToValueAtTime(s.value, s.endTime) : "linearRampToValue" === s.type ? _.linearRampToValueAtTime(s.value, s.endTime) : "setValue" === s.type ? _.setValueAtTime(s.value, s.startTime) : "setValueCurve" === s.type && _.setValueCurveAtTime(s.values, s.startTime, s.duration));
          }
          return w;
        }, cancelScheduledValues: t => (null === x && y.flush(n.context.currentTime), y.add(r(t)), _.cancelScheduledValues(t), w), exponentialRampToValueAtTime(t, e) {
          if (0 === t) throw new RangeError;
          if (!Number.isFinite(e) || e < 0) throw new RangeError;
          const s = n.context.currentTime;
          return null === x && y.flush(s), 0 === Array.from(y).length && (y.add(l(v, s)), _.setValueAtTime(v, s)), y.add(a(t, e)), _.exponentialRampToValueAtTime(t, e), w;
        }, linearRampToValueAtTime(t, e) {
          const s = n.context.currentTime;
          return null === x && y.flush(s), 0 === Array.from(y).length && (y.add(l(v, s)), _.setValueAtTime(v, s)), y.add(c(t, e)), _.linearRampToValueAtTime(t, e), w;
        }, setTargetAtTime: (t, e, s) => (null === x && y.flush(n.context.currentTime), y.add(h(t, e, s)), _.setTargetAtTime(t, e, s), w), setValueAtTime: (t, e) => (null === x && y.flush(n.context.currentTime), y.add(l(t, e)), _.setValueAtTime(t, e), w), setValueCurveAtTime(t, e, s) {
          const i = t instanceof Float32Array ? t : new Float32Array(t);
          if (null !== p && "webkitAudioContext" === p.name) {
            const t = e + s, o = n.context.sampleRate, r = Math.ceil(e * o), a = Math.floor(t * o), c = a - r, h = new Float32Array(c);
            for (let t = 0; t < c; t += 1) {
              const n = (i.length - 1) / s * ((r + t) / o - e), a = Math.floor(n), c = Math.ceil(n);
              h[t] = a === c ? i[a] : (1 - (n - a)) * i[a] + (1 - (c - n)) * i[c];
            }
            null === x && y.flush(n.context.currentTime), y.add(u(h, e, s)), _.setValueCurveAtTime(h, e, s);
            const l = a / o;
            l < t && d(w, h[h.length - 1], l), d(w, i[i.length - 1], t);
          } else null === x && y.flush(n.context.currentTime), y.add(u(i, e, s)), _.setValueCurveAtTime(i, e, s);
          return w;
        }};
        return s.set(w, _), e.set(w, n), t(w, x), w;
      })((Ke = h, (t, e) => {
        Ke.set(t, {activeInputs: new Set, passiveInputs: new WeakMap, renderer: e});
      }), De, l, 0, o.createCancelAndHoldAutomationEvent, o.createCancelScheduledValuesAutomationEvent, o.createExponentialRampToValueAutomationEvent, o.createLinearRampToValueAutomationEvent, o.createSetTargetAutomationEvent, o.createSetValueAutomationEvent, o.createSetValueCurveAutomationEvent, Ee, ie);
      var Ke;
      const ts = ((t, e, s, n, i, o, r, a) => class extends t {
        constructor(t, n) {
          const a = o(t), c = {...P, ...n}, h = i(a, c), l = r(a), u = l ? e() : null;
          super(t, false, h, u), this._audioBufferSourceNodeRenderer = u, this._isBufferNullified = false, this._isBufferSet = null !== c.buffer, this._nativeAudioBufferSourceNode = h, this._onended = null, this._playbackRate = s(this, l, h.playbackRate, V, F);
        }
        get buffer() {
          return this._isBufferNullified ? null : this._nativeAudioBufferSourceNode.buffer;
        }
        set buffer (t) {
          if (this._nativeAudioBufferSourceNode.buffer = t, null !== t) {
            if (this._isBufferSet) throw n();
            this._isBufferSet = true;
          }
        }
        get loop() {
          return this._nativeAudioBufferSourceNode.loop;
        }
        set loop (t) {
          this._nativeAudioBufferSourceNode.loop = t;
        }
        get loopEnd() {
          return this._nativeAudioBufferSourceNode.loopEnd;
        }
        set loopEnd (t) {
          this._nativeAudioBufferSourceNode.loopEnd = t;
        }
        get loopStart() {
          return this._nativeAudioBufferSourceNode.loopStart;
        }
        set loopStart (t) {
          this._nativeAudioBufferSourceNode.loopStart = t;
        }
        get onended() {
          return this._onended;
        }
        set onended (t) {
          const e = "function" == typeof t ? a(this, t) : null;
          this._nativeAudioBufferSourceNode.onended = e;
          const s = this._nativeAudioBufferSourceNode.onended;
          this._onended = null !== s && s === e ? t : s;
        }
        get playbackRate() {
          return this._playbackRate;
        }
        start(t = 0, e = 0, s) {
          if (this._nativeAudioBufferSourceNode.start(t, e, s), null !== this._audioBufferSourceNodeRenderer && (this._audioBufferSourceNodeRenderer.start = undefined === s ? [t, e] : [t, e, s]), "closed" !== this.context.state) {
            k(this);
            const t = () => {
              this._nativeAudioBufferSourceNode.removeEventListener("ended", t), N(this) && C(this);
            };
            this._nativeAudioBufferSourceNode.addEventListener("ended", t);
          }
        }
        stop(t = 0) {
          this._nativeAudioBufferSourceNode.stop(t), null !== this._audioBufferSourceNodeRenderer && (this._audioBufferSourceNodeRenderer.stop = t);
        }
      })(Ve, He, Je, At, Ye, ke, Oe, ue), es = ((t, e, s, n, i, o, r, a) => class extends t {
        constructor(t, e) {
          const s = o(t), n = r(s), c = i(s, e, n);
          super(t, false, c, n ? (t => {
            const e = new WeakMap;
            return {render(s, n) {
              const i = e.get(n);
              return undefined !== i ? Promise.resolve(i) : (async (s, n) => {
                const i = n.destination;
                return e.set(n, i), await t(s, n, i), i;
              })(s, n);
            }};
          })(a) : null), this._isNodeOfNativeOfflineAudioContext = n, this._nativeAudioDestinationNode = c;
        }
        get channelCount() {
          return this._nativeAudioDestinationNode.channelCount;
        }
        set channelCount (t) {
          if (this._isNodeOfNativeOfflineAudioContext) throw n();
          if (t > this._nativeAudioDestinationNode.maxChannelCount) throw s();
          this._nativeAudioDestinationNode.channelCount = t;
        }
        get channelCountMode() {
          return this._nativeAudioDestinationNode.channelCountMode;
        }
        set channelCountMode (t) {
          if (this._isNodeOfNativeOfflineAudioContext) throw n();
          this._nativeAudioDestinationNode.channelCountMode = t;
        }
        get maxChannelCount() {
          return this._nativeAudioDestinationNode.maxChannelCount;
        }
      })(Ve, 0, R, At, ((t, e) => (s, n, i) => {
        const o = s.destination;
        if (o.channelCount !== n) try {
          o.channelCount = n;
        } catch {}
        i && "explicit" !== o.channelCountMode && (o.channelCountMode = "explicit"), 0 === o.maxChannelCount && Object.defineProperty(o, "maxChannelCount", {value: n});
        const r = t(s, {channelCount: n, channelCountMode: o.channelCountMode, channelInterpretation: o.channelInterpretation, gain: 1});
        return e(r, "channelCount", t => () => t.call(r), t => e => {
          t.call(r, e);
          try {
            o.channelCount = e;
          } catch (t) {
            if (e > o.maxChannelCount) throw t;
          }
        }), e(r, "channelCountMode", t => () => t.call(r), t => e => {
          t.call(r, e), o.channelCountMode = e;
        }), e(r, "channelInterpretation", t => () => t.call(r), t => e => {
          t.call(r, e), o.channelInterpretation = e;
        }), Object.defineProperty(r, "maxChannelCount", {get: () => o.maxChannelCount}), r.connect(o), r;
      })(Bt, ne), ke, Oe, Te), ss = ((t, e, s, n, i) => () => {
        const o = new WeakMap;
        return {render(r, a) {
          const c = o.get(a);
          return undefined !== c ? Promise.resolve(c) : (async (r, a) => {
            let c = s(r);
            const h = M(c, a);
            if (!h) {
              const t = {Q: c.Q.value, channelCount: c.channelCount, channelCountMode: c.channelCountMode, channelInterpretation: c.channelInterpretation, detune: c.detune.value, frequency: c.frequency.value, gain: c.gain.value, type: c.type};
              c = e(a, t);
            }
            return o.set(a, c), h ? (await t(a, r.Q, c.Q), await t(a, r.detune, c.detune), await t(a, r.frequency, c.frequency), await t(a, r.gain, c.gain)) : (await n(a, r.Q, c.Q), await n(a, r.detune, c.detune), await n(a, r.frequency, c.frequency), await n(a, r.gain, c.gain)), await i(r, a, c), c;
          })(r, a);
        }};
      })(Xe, jt, tt, $e, Te), ns = (t => (e, s) => t.set(e, s))(_e), is = ((t, e, s, n, i, o, r, a) => class extends t {
        constructor(t, n) {
          const c = o(t), h = {...mt, ...n}, l = i(c, h), u = r(c);
          super(t, false, l, u ? s() : null), this._Q = e(this, u, l.Q, V, F), this._detune = e(this, u, l.detune, 1200 * Math.log2(V), -1200 * Math.log2(V)), this._frequency = e(this, u, l.frequency, t.sampleRate / 2, 0), this._gain = e(this, u, l.gain, 40 * Math.log10(V), F), this._nativeBiquadFilterNode = l, a(this, 1);
        }
        get detune() {
          return this._detune;
        }
        get frequency() {
          return this._frequency;
        }
        get gain() {
          return this._gain;
        }
        get Q() {
          return this._Q;
        }
        get type() {
          return this._nativeBiquadFilterNode.type;
        }
        set type (t) {
          this._nativeBiquadFilterNode.type = t;
        }
        getFrequencyResponse(t, e, s) {
          try {
            this._nativeBiquadFilterNode.getFrequencyResponse(t, e, s);
          } catch (t) {
            if (11 === t.code) throw n();
            throw t;
          }
          if (t.length !== e.length || e.length !== s.length) throw n();
        }
      })(Ve, Je, ss, Ct, jt, ke, Oe, ns), os = ((t, e) => (s, n, i) => {
        const o = new Set;
        return s.connect = (i => (r, a = 0, c = 0) => {
          const h = 0 === o.size;
          if (e(r)) return i.call(s, r, a, c), t(o, [r, a, c], t => t[0] === r && t[1] === a && t[2] === c, true), h && n(), r;
          i.call(s, r, a), t(o, [r, a], t => t[0] === r && t[1] === a, true), h && n();
        })(s.connect), s.disconnect = (t => (n, r, a) => {
          const c = o.size > 0;
          if (undefined === n) t.apply(s), o.clear(); else if ("number" == typeof n) {
            t.call(s, n);
            for (const t of o) t[1] === n && o.delete(t);
          } else {
            e(n) ? t.call(s, n, r, a) : t.call(s, n, r);
            for (const t of o) t[0] !== n || undefined !== r && t[1] !== r || undefined !== a && t[2] !== a || o.delete(t);
          }
          const h = 0 === o.size;
          c && h && i();
        })(s.disconnect), s;
      })(G, qe), rs = ((t, e) => (s, n) => {
        n.channelCount = 1, n.channelCountMode = "explicit", Object.defineProperty(n, "channelCount", {get: () => 1, set: () => {
          throw t();
        }}), Object.defineProperty(n, "channelCountMode", {get: () => "explicit", set: () => {
          throw t();
        }});
        const i = s.createBufferSource();
        e(n, () => {
          const t = n.numberOfInputs;
          for (let e = 0; e < t; e += 1) i.connect(n, 0, e);
        }, () => i.disconnect(n));
      })(At, os), as = ((t, e) => (s, n) => {
        const i = s.createChannelMerger(n.numberOfInputs);
        return null !== t && "webkitAudioContext" === t.name && e(s, i), qt(i, n), i;
      })(Ee, rs), cs = ((t, e, s) => () => {
        const n = new WeakMap;
        return {render(i, o) {
          const r = n.get(o);
          return undefined !== r ? Promise.resolve(r) : (async (i, o) => {
            let r = e(i);
            if (!M(r, o)) {
              const e = {channelCount: r.channelCount, channelCountMode: r.channelCountMode, channelInterpretation: r.channelInterpretation, numberOfInputs: r.numberOfInputs};
              r = t(o, e);
            }
            return n.set(o, r), await s(i, o, r), r;
          })(i, o);
        }};
      })(as, tt, Te), hs = ((t, e, s, n, i) => class extends t {
        constructor(t, o) {
          const r = n(t), a = {...gt, ...o};
          super(t, false, s(r, a), i(r) ? e() : null);
        }
      })(Ve, cs, as, ke, Oe), ls = ((t, e, s) => () => {
        const n = new WeakMap;
        return {render(i, o) {
          const r = n.get(o);
          return undefined !== r ? Promise.resolve(r) : (async (i, o) => {
            let r = e(i);
            if (!M(r, o)) {
              const e = {channelCount: r.channelCount, channelCountMode: r.channelCountMode, channelInterpretation: r.channelInterpretation, numberOfOutputs: r.numberOfOutputs};
              r = t(o, e);
            }
            return n.set(o, r), await s(i, o, r), r;
          })(i, o);
        }};
      })(Lt, tt, Te), us = ((t, e, s, n, i, o) => class extends t {
        constructor(t, o) {
          const r = n(t), a = (t => ({...t, channelCount: t.numberOfOutputs}))({...vt, ...o});
          super(t, false, s(r, a), i(r) ? e() : null);
        }
      })(Ve, ls, Lt, ke, Oe), ps = ((t, e, s, n) => (i, {offset: o, ...r}) => {
        const a = i.createBuffer(1, 2, 44100), c = e(i, {buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1}), h = s(i, {...r, gain: o}), l = a.getChannelData(0);
        l[0] = 1, l[1] = 1, c.buffer = a, c.loop = true;
        const u = {get bufferSize() {}, get channelCount() {
          return h.channelCount;
        }, set channelCount (t) {
          h.channelCount = t;
        }, get channelCountMode() {
          return h.channelCountMode;
        }, set channelCountMode (t) {
          h.channelCountMode = t;
        }, get channelInterpretation() {
          return h.channelInterpretation;
        }, set channelInterpretation (t) {
          h.channelInterpretation = t;
        }, get context() {
          return h.context;
        }, get inputs() {
          return [];
        }, get numberOfInputs() {
          return c.numberOfInputs;
        }, get numberOfOutputs() {
          return h.numberOfOutputs;
        }, get offset() {
          return h.gain;
        }, get onended() {
          return c.onended;
        }, set onended (t) {
          c.onended = t;
        }, addEventListener: (...t) => c.addEventListener(t[0], t[1], t[2]), dispatchEvent: (...t) => c.dispatchEvent(t[0]), removeEventListener: (...t) => c.removeEventListener(t[0], t[1], t[2]), start(t = 0) {
          c.start.call(c, t);
        }, stop(t = 0) {
          c.stop.call(c, t);
        }};
        return t(i, c), n(zt(u, h), () => c.connect(h), () => c.disconnect(h));
      })(Qe, Ye, Bt, os), ds = ((t, e, s, n, i) => (o, r) => {
        if (undefined === o.createConstantSource) return s(o, r);
        const a = o.createConstantSource();
        return qt(a, r), Ft(a, r, "offset"), e(n, () => n(o)) || Vt(a), e(i, () => i(o)) || Nt(a), t(o, a), a;
      })(Qe, ge, ps, oe, ae), fs = ((t, e, s, n, i) => () => {
        const o = new WeakMap;
        let r = null, a = null;
        return {set start (t) {
          r = t;
        }, set stop (t) {
          a = t;
        }, render(c, h) {
          const l = o.get(h);
          return undefined !== l ? Promise.resolve(l) : (async (c, h) => {
            let l = s(c);
            const u = M(l, h);
            if (!u) {
              const t = {channelCount: l.channelCount, channelCountMode: l.channelCountMode, channelInterpretation: l.channelInterpretation, offset: l.offset.value};
              l = e(h, t), null !== r && l.start(r), null !== a && l.stop(a);
            }
            return o.set(h, l), u ? await t(h, c.offset, l.offset) : await n(h, c.offset, l.offset), await i(c, h, l), l;
          })(c, h);
        }};
      })(Xe, ds, tt, $e, Te), _s = ((t, e, s, n, i, o, r) => class extends t {
        constructor(t, r) {
          const a = i(t), c = {...yt, ...r}, h = n(a, c), l = o(a), u = l ? s() : null;
          super(t, false, h, u), this._constantSourceNodeRenderer = u, this._nativeConstantSourceNode = h, this._offset = e(this, l, h.offset, V, F), this._onended = null;
        }
        get offset() {
          return this._offset;
        }
        get onended() {
          return this._onended;
        }
        set onended (t) {
          const e = "function" == typeof t ? r(this, t) : null;
          this._nativeConstantSourceNode.onended = e;
          const s = this._nativeConstantSourceNode.onended;
          this._onended = null !== s && s === e ? t : s;
        }
        start(t = 0) {
          if (this._nativeConstantSourceNode.start(t), null !== this._constantSourceNodeRenderer && (this._constantSourceNodeRenderer.start = t), "closed" !== this.context.state) {
            k(this);
            const t = () => {
              this._nativeConstantSourceNode.removeEventListener("ended", t), N(this) && C(this);
            };
            this._nativeConstantSourceNode.addEventListener("ended", t);
          }
        }
        stop(t = 0) {
          this._nativeConstantSourceNode.stop(t), null !== this._constantSourceNodeRenderer && (this._constantSourceNodeRenderer.stop = t);
        }
      })(Ve, Je, fs, ds, ke, Oe, ue), ms = ((t, e) => (s, n) => {
        const i = s.createConvolver();
        if (qt(i, n), n.disableNormalization === i.normalize && (i.normalize = !n.disableNormalization), Rt(i, n, "buffer"), n.channelCount > 2) throw t();
        if (e(i, "channelCount", t => () => t.call(i), e => s => {
          if (s > 2) throw t();
          return e.call(i, s);
        }), "max" === n.channelCountMode) throw t();
        return e(i, "channelCountMode", t => () => t.call(i), e => s => {
          if ("max" === s) throw t();
          return e.call(i, s);
        }), i;
      })(Zt, ne), gs = ((t, e, s) => () => {
        const n = new WeakMap;
        return {render(i, o) {
          const r = n.get(o);
          return undefined !== r ? Promise.resolve(r) : (async (i, o) => {
            let r = e(i);
            if (!M(r, o)) {
              const e = {buffer: r.buffer, channelCount: r.channelCount, channelCountMode: r.channelCountMode, channelInterpretation: r.channelInterpretation, disableNormalization: !r.normalize};
              r = t(o, e);
            }
            return n.set(o, r), X(r) ? await s(i, o, r.inputs[0]) : await s(i, o, r), r;
          })(i, o);
        }};
      })(ms, tt, Te), vs = ((t, e, s, n, i, o) => class extends t {
        constructor(t, r) {
          const a = n(t), c = {...xt, ...r}, h = s(a, c);
          super(t, false, h, i(a) ? e() : null), this._isBufferNullified = false, this._nativeConvolverNode = h, null !== c.buffer && o(this, c.buffer.duration);
        }
        get buffer() {
          return this._isBufferNullified ? null : this._nativeConvolverNode.buffer;
        }
        set buffer (t) {
          if (this._nativeConvolverNode.buffer = t, null === t && null !== this._nativeConvolverNode.buffer) {
            const t = this._nativeConvolverNode.context;
            this._nativeConvolverNode.buffer = t.createBuffer(1, 1, t.sampleRate), this._isBufferNullified = true, o(this, 0);
          } else this._isBufferNullified = false, o(this, null === this._nativeConvolverNode.buffer ? 0 : this._nativeConvolverNode.buffer.duration);
        }
        get normalize() {
          return this._nativeConvolverNode.normalize;
        }
        set normalize (t) {
          this._nativeConvolverNode.normalize = t;
        }
      })(Ve, gs, ms, ke, Oe, ns), ys = ((t, e, s, n, i) => o => {
        const r = new WeakMap;
        return {render(a, c) {
          const h = r.get(c);
          return undefined !== h ? Promise.resolve(h) : (async (a, c) => {
            let h = s(a);
            const l = M(h, c);
            if (!l) {
              const t = {channelCount: h.channelCount, channelCountMode: h.channelCountMode, channelInterpretation: h.channelInterpretation, delayTime: h.delayTime.value, maxDelayTime: o};
              h = e(c, t);
            }
            return r.set(c, h), l ? await t(c, a.delayTime, h.delayTime) : await n(c, a.delayTime, h.delayTime), await i(a, c, h), h;
          })(a, c);
        }};
      })(Xe, Wt, tt, $e, Te), xs = ((t, e, s, n, i, o, r) => class extends t {
        constructor(t, a) {
          const c = i(t), h = {...bt, ...a}, l = n(c, h), u = o(c);
          super(t, false, l, u ? s(h.maxDelayTime) : null), this._delayTime = e(this, u, l.delayTime), r(this, h.maxDelayTime);
        }
        get delayTime() {
          return this._delayTime;
        }
      })(Ve, Je, ys, Wt, ke, Oe, ns), ws = (t => (e, s) => {
        const n = e.createDynamicsCompressor();
        if (qt(n, s), s.channelCount > 2) throw t();
        if ("max" === s.channelCountMode) throw t();
        return Ft(n, s, "attack"), Ft(n, s, "knee"), Ft(n, s, "ratio"), Ft(n, s, "release"), Ft(n, s, "threshold"), n;
      })(Zt), bs = ((t, e, s, n, i) => () => {
        const o = new WeakMap;
        return {render(r, a) {
          const c = o.get(a);
          return undefined !== c ? Promise.resolve(c) : (async (r, a) => {
            let c = s(r);
            const h = M(c, a);
            if (!h) {
              const t = {attack: c.attack.value, channelCount: c.channelCount, channelCountMode: c.channelCountMode, channelInterpretation: c.channelInterpretation, knee: c.knee.value, ratio: c.ratio.value, release: c.release.value, threshold: c.threshold.value};
              c = e(a, t);
            }
            return o.set(a, c), h ? (await t(a, r.attack, c.attack), await t(a, r.knee, c.knee), await t(a, r.ratio, c.ratio), await t(a, r.release, c.release), await t(a, r.threshold, c.threshold)) : (await n(a, r.attack, c.attack), await n(a, r.knee, c.knee), await n(a, r.ratio, c.ratio), await n(a, r.release, c.release), await n(a, r.threshold, c.threshold)), await i(r, a, c), c;
          })(r, a);
        }};
      })(Xe, ws, tt, $e, Te), Ts = ((t, e, s, n, i, o, r, a) => class extends t {
        constructor(t, i) {
          const c = o(t), h = {...St, ...i}, l = n(c, h), u = r(c);
          super(t, false, l, u ? s() : null), this._attack = e(this, u, l.attack), this._knee = e(this, u, l.knee), this._nativeDynamicsCompressorNode = l, this._ratio = e(this, u, l.ratio), this._release = e(this, u, l.release), this._threshold = e(this, u, l.threshold), a(this, 0.006);
        }
        get attack() {
          return this._attack;
        }
        get channelCount() {
          return this._nativeDynamicsCompressorNode.channelCount;
        }
        set channelCount (t) {
          const e = this._nativeDynamicsCompressorNode.channelCount;
          if (this._nativeDynamicsCompressorNode.channelCount = t, t > 2) throw this._nativeDynamicsCompressorNode.channelCount = e, i();
        }
        get channelCountMode() {
          return this._nativeDynamicsCompressorNode.channelCountMode;
        }
        set channelCountMode (t) {
          const e = this._nativeDynamicsCompressorNode.channelCountMode;
          if (this._nativeDynamicsCompressorNode.channelCountMode = t, "max" === t) throw this._nativeDynamicsCompressorNode.channelCountMode = e, i();
        }
        get knee() {
          return this._knee;
        }
        get ratio() {
          return this._ratio;
        }
        get reduction() {
          return "number" == typeof this._nativeDynamicsCompressorNode.reduction.value ? this._nativeDynamicsCompressorNode.reduction.value : this._nativeDynamicsCompressorNode.reduction;
        }
        get release() {
          return this._release;
        }
        get threshold() {
          return this._threshold;
        }
      })(Ve, Je, bs, ws, Zt, ke, Oe, ns), Ss = ((t, e, s, n, i) => () => {
        const o = new WeakMap;
        return {render(r, a) {
          const c = o.get(a);
          return undefined !== c ? Promise.resolve(c) : (async (r, a) => {
            let c = s(r);
            const h = M(c, a);
            if (!h) {
              const t = {channelCount: c.channelCount, channelCountMode: c.channelCountMode, channelInterpretation: c.channelInterpretation, gain: c.gain.value};
              c = e(a, t);
            }
            return o.set(a, c), h ? await t(a, r.gain, c.gain) : await n(a, r.gain, c.gain), await i(r, a, c), c;
          })(r, a);
        }};
      })(Xe, Bt, tt, $e, Te), ks = ((t, e, s, n, i, o) => class extends t {
        constructor(t, r) {
          const a = i(t), c = {...kt, ...r}, h = n(a, c), l = o(a);
          super(t, false, h, l ? s() : null), this._gain = e(this, l, h.gain, V, F);
        }
        get gain() {
          return this._gain;
        }
      })(Ve, Je, Ss, Bt, ke, Oe), As = ((t, e, s, n) => (i, o, {channelCount: r, channelCountMode: a, channelInterpretation: c, feedback: h, feedforward: l}) => {
        const u = Pt(o, i.sampleRate), p = h instanceof Float64Array ? h : new Float64Array(h), d = l instanceof Float64Array ? l : new Float64Array(l), f = p.length, _ = d.length, m = Math.min(f, _);
        if (0 === f || f > 20) throw n();
        if (0 === p[0]) throw e();
        if (0 === _ || _ > 20) throw n();
        if (0 === d[0]) throw e();
        if (1 !== p[0]) {
          for (let t = 0; t < _; t += 1) d[t] /= p[0];
          for (let t = 1; t < f; t += 1) p[t] /= p[0];
        }
        const g = s(i, u, r, r);
        g.channelCount = r, g.channelCountMode = a, g.channelInterpretation = c;
        const v = [], y = [], x = [];
        for (let t = 0; t < r; t += 1) {
          v.push(0);
          const t = new Float32Array(32), e = new Float32Array(32);
          t.fill(0), e.fill(0), y.push(t), x.push(e);
        }
        g.onaudioprocess = t => {
          const e = t.inputBuffer, s = t.outputBuffer, n = e.numberOfChannels;
          for (let t = 0; t < n; t += 1) {
            const n = e.getChannelData(t), i = s.getChannelData(t);
            v[t] = Dt(p, f, d, _, m, y[t], x[t], v[t], 32, n, i);
          }
        };
        const w = i.sampleRate / 2;
        return zt({get bufferSize() {
          return u;
        }, get channelCount() {
          return g.channelCount;
        }, set channelCount (t) {
          g.channelCount = t;
        }, get channelCountMode() {
          return g.channelCountMode;
        }, set channelCountMode (t) {
          g.channelCountMode = t;
        }, get channelInterpretation() {
          return g.channelInterpretation;
        }, set channelInterpretation (t) {
          g.channelInterpretation = t;
        }, get context() {
          return g.context;
        }, get inputs() {
          return [g];
        }, get numberOfInputs() {
          return g.numberOfInputs;
        }, get numberOfOutputs() {
          return g.numberOfOutputs;
        }, addEventListener: (...t) => g.addEventListener(t[0], t[1], t[2]), dispatchEvent: (...t) => g.dispatchEvent(t[0]), getFrequencyResponse(e, s, n) {
          if (e.length !== s.length || s.length !== n.length) throw t();
          const i = e.length;
          for (let t = 0; t < i; t += 1) {
            const i = -Math.PI * (e[t] / w), o = [Math.cos(i), Math.sin(i)], r = Ut(Gt(d, o), Gt(p, o));
            s[t] = Math.sqrt(r[0] * r[0] + r[1] * r[1]), n[t] = Math.atan2(r[1], r[0]);
          }
        }, removeEventListener: (...t) => g.removeEventListener(t[0], t[1], t[2])}, g);
      })(Ct, At, Qt, Zt), Cs = ((t, e, s, n) => i => t(Et, () => Et(i)) ? Promise.resolve(t(n, n)).then(t => {
        if (!t) {
          const t = s(i, 512, 0, 1);
          i.oncomplete = () => {
            t.onaudioprocess = null, t.disconnect();
          }, t.onaudioprocess = () => i.currentTime, t.connect(i.destination);
        }
        return i.startRendering();
      }) : new Promise(t => {
        const s = e(i, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0});
        i.oncomplete = e => {
          s.disconnect(), t(e.renderedBuffer);
        }, s.connect(i.destination), i.startRendering();
      }))(ge, Bt, Qt, ((t, e) => () => {
        if (null === e) return Promise.resolve(false);
        const s = new e(1, 1, 44100), n = t(s, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0});
        return new Promise(t => {
          s.oncomplete = () => {
            n.disconnect(), t(0 !== s.currentTime);
          }, s.startRendering();
        });
      })(Bt, Ce)), Os = ((t, e, s, n, i) => (o, r) => {
        const a = new WeakMap;
        let c = null;
        return {render(h, l) {
          const u = a.get(l);
          return undefined !== u ? Promise.resolve(u) : (async (h, l) => {
            let u = null, p = e(h);
            const d = M(p, l);
            if (undefined === l.createIIRFilter ? u = t(l, {buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1}) : d || (p = l.createIIRFilter(r, o)), a.set(l, null === u ? p : u), null !== u) {
              if (null === c) {
                if (null === s) throw new Error("Missing the native OfflineAudioContext constructor.");
                const t = new s(h.context.destination.channelCount, h.context.length, l.sampleRate);
                c = (async () => (await n(h, t, t.destination), ((t, e, s, n) => {
                  const i = s instanceof Float64Array ? s : new Float64Array(s), o = n instanceof Float64Array ? n : new Float64Array(n), r = i.length, a = o.length, c = Math.min(r, a);
                  if (1 !== i[0]) {
                    for (let t = 0; t < r; t += 1) o[t] /= i[0];
                    for (let t = 1; t < a; t += 1) i[t] /= i[0];
                  }
                  const h = new Float32Array(32), l = new Float32Array(32), u = e.createBuffer(t.numberOfChannels, t.length, t.sampleRate), p = t.numberOfChannels;
                  for (let e = 0; e < p; e += 1) {
                    const s = t.getChannelData(e), n = u.getChannelData(e);
                    h.fill(0), l.fill(0), Dt(i, r, o, a, c, h, l, 0, 32, s, n);
                  }
                  return u;
                })(await i(t), l, o, r)))();
              }
              const t = await c;
              return u.buffer = t, u.start(0), u;
            }
            return await n(h, l, p), p;
          })(h, l);
        }};
      })(Ye, tt, Ce, Te, Cs), Ds = (t => (e, s, n) => {
        if (undefined === e.createIIRFilter) return t(e, s, n);
        const i = e.createIIRFilter(n.feedforward, n.feedback);
        return qt(i, n), i;
      })(As), Ms = ((t, e, s, n, i, o) => class extends t {
        constructor(t, r) {
          const a = n(t), c = i(a), h = {...Ot, ...r}, l = e(a, c ? null : t.baseLatency, h);
          super(t, false, l, c ? s(h.feedback, h.feedforward) : null), (t => {
            var e;
            t.getFrequencyResponse = (e = t.getFrequencyResponse, (s, n, i) => {
              if (s.length !== n.length || n.length !== i.length) throw Ct();
              return e.call(t, s, n, i);
            });
          })(l), this._nativeIIRFilterNode = l, o(this, 1);
        }
        getFrequencyResponse(t, e, s) {
          return this._nativeIIRFilterNode.getFrequencyResponse(t, e, s);
        }
      })(Ve, Ds, Os, ke, Oe, ns), Es = ((t, e, s, n, i, o, r, a) => (c, h) => {
        const l = h.listener, {forwardX: u, forwardY: p, forwardZ: d, positionX: f, positionY: _, positionZ: m, upX: g, upY: v, upZ: y} = undefined === l.forwardX ? (() => {
          const u = new Float32Array(1), p = e(h, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 9}), d = r(h);
          let f = false, _ = [0, 0, -1, 0, 1, 0], m = [0, 0, 0];
          const g = () => {
            if (f) return;
            f = true;
            const t = n(h, 256, 9, 0);
            t.onaudioprocess = ({inputBuffer: t}) => {
              const e = [o(t, u, 0), o(t, u, 1), o(t, u, 2), o(t, u, 3), o(t, u, 4), o(t, u, 5)];
              e.some((t, e) => t !== _[e]) && (l.setOrientation(...e), _ = e);
              const s = [o(t, u, 6), o(t, u, 7), o(t, u, 8)];
              s.some((t, e) => t !== m[e]) && (l.setPosition(...s), m = s);
            }, p.connect(t);
          }, v = t => e => {
            e !== _[t] && (_[t] = e, l.setOrientation(..._));
          }, y = t => e => {
            e !== m[t] && (m[t] = e, l.setPosition(...m));
          }, x = (e, n, o) => {
            const r = s(h, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: n});
            r.connect(p, 0, e), r.start(), Object.defineProperty(r.offset, "defaultValue", {get: () => n});
            const l = t({context: c}, d, r.offset, V, F);
            var u, f, _, m, v, y, x;
            return a(l, "value", t => () => t.call(l), t => e => {
              try {
                t.call(l, e);
              } catch (t) {
                if (9 !== t.code) throw t;
              }
              g(), d && o(e);
            }), l.cancelAndHoldAtTime = (u = l.cancelAndHoldAtTime, d ? () => {
              throw i();
            } : (...t) => {
              const e = u.apply(l, t);
              return g(), e;
            }), l.cancelScheduledValues = (f = l.cancelScheduledValues, d ? () => {
              throw i();
            } : (...t) => {
              const e = f.apply(l, t);
              return g(), e;
            }), l.exponentialRampToValueAtTime = (_ = l.exponentialRampToValueAtTime, d ? () => {
              throw i();
            } : (...t) => {
              const e = _.apply(l, t);
              return g(), e;
            }), l.linearRampToValueAtTime = (m = l.linearRampToValueAtTime, d ? () => {
              throw i();
            } : (...t) => {
              const e = m.apply(l, t);
              return g(), e;
            }), l.setTargetAtTime = (v = l.setTargetAtTime, d ? () => {
              throw i();
            } : (...t) => {
              const e = v.apply(l, t);
              return g(), e;
            }), l.setValueAtTime = (y = l.setValueAtTime, d ? () => {
              throw i();
            } : (...t) => {
              const e = y.apply(l, t);
              return g(), e;
            }), l.setValueCurveAtTime = (x = l.setValueCurveAtTime, d ? () => {
              throw i();
            } : (...t) => {
              const e = x.apply(l, t);
              return g(), e;
            }), l;
          };
          return {forwardX: x(0, 0, v(0)), forwardY: x(1, 0, v(1)), forwardZ: x(2, -1, v(2)), positionX: x(6, 0, y(0)), positionY: x(7, 0, y(1)), positionZ: x(8, 0, y(2)), upX: x(3, 0, v(3)), upY: x(4, 1, v(4)), upZ: x(5, 0, v(5))};
        })() : l;
        return {get forwardX() {
          return u;
        }, get forwardY() {
          return p;
        }, get forwardZ() {
          return d;
        }, get positionX() {
          return f;
        }, get positionY() {
          return _;
        }, get positionZ() {
          return m;
        }, get upX() {
          return g;
        }, get upY() {
          return v;
        }, get upZ() {
          return y;
        }};
      })(Je, as, ds, Qt, Zt, ee, Oe, ne), Rs = new WeakMap, qs = ((t, e, s, n, i, o) => class extends s {
        constructor(s, o) {
          super(s), this._nativeContext = s, u.set(this, s), n(s) && i.set(s, new Set), this._destination = new t(this, o), this._listener = e(this, s), this._onstatechange = null;
        }
        get currentTime() {
          return this._nativeContext.currentTime;
        }
        get destination() {
          return this._destination;
        }
        get listener() {
          return this._listener;
        }
        get onstatechange() {
          return this._onstatechange;
        }
        set onstatechange (t) {
          const e = "function" == typeof t ? o(this, t) : null;
          this._nativeContext.onstatechange = e;
          const s = this._nativeContext.onstatechange;
          this._onstatechange = null !== s && s === e ? t : s;
        }
        get sampleRate() {
          return this._nativeContext.sampleRate;
        }
        get state() {
          return this._nativeContext.state;
        }
      })(es, Es, Me, Oe, Rs, ue), Is = ((t, e, s, n, i, o) => (r, a) => {
        const c = r.createOscillator();
        return qt(c, a), Ft(c, a, "detune"), Ft(c, a, "frequency"), undefined !== a.periodicWave ? c.setPeriodicWave(a.periodicWave) : Rt(c, a, "type"), e(s, () => s(r)) || Vt(c), e(n, () => n(r)) || o(c, r), e(i, () => i(r)) || Nt(c), t(r, c), c;
      })(Qe, ge, oe, re, ae, le), Fs = ((t, e, s, n, i) => () => {
        const o = new WeakMap;
        let r = null, a = null, c = null;
        return {set periodicWave (t) {
          r = t;
        }, set start (t) {
          a = t;
        }, set stop (t) {
          c = t;
        }, render(h, l) {
          const u = o.get(l);
          return undefined !== u ? Promise.resolve(u) : (async (h, l) => {
            let u = s(h);
            const p = M(u, l);
            if (!p) {
              const t = {channelCount: u.channelCount, channelCountMode: u.channelCountMode, channelInterpretation: u.channelInterpretation, detune: u.detune.value, frequency: u.frequency.value, periodicWave: null === r ? undefined : r, type: u.type};
              u = e(l, t), null !== a && u.start(a), null !== c && u.stop(c);
            }
            return o.set(l, u), p ? (await t(l, h.detune, u.detune), await t(l, h.frequency, u.frequency)) : (await n(l, h.detune, u.detune), await n(l, h.frequency, u.frequency)), await i(h, l, u), u;
          })(h, l);
        }};
      })(Xe, Is, tt, $e, Te), Vs = ((t, e, s, n, i, o, r) => class extends t {
        constructor(t, r) {
          const a = i(t), c = {...Yt, ...r}, h = s(a, c), l = o(a), u = l ? n() : null, p = t.sampleRate / 2;
          super(t, false, h, u), this._detune = e(this, l, h.detune, 153600, -153600), this._frequency = e(this, l, h.frequency, p, -p), this._nativeOscillatorNode = h, this._onended = null, this._oscillatorNodeRenderer = u, null !== this._oscillatorNodeRenderer && undefined !== c.periodicWave && (this._oscillatorNodeRenderer.periodicWave = c.periodicWave);
        }
        get detune() {
          return this._detune;
        }
        get frequency() {
          return this._frequency;
        }
        get onended() {
          return this._onended;
        }
        set onended (t) {
          const e = "function" == typeof t ? r(this, t) : null;
          this._nativeOscillatorNode.onended = e;
          const s = this._nativeOscillatorNode.onended;
          this._onended = null !== s && s === e ? t : s;
        }
        get type() {
          return this._nativeOscillatorNode.type;
        }
        set type (t) {
          this._nativeOscillatorNode.type = t, null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.periodicWave = null);
        }
        setPeriodicWave(t) {
          this._nativeOscillatorNode.setPeriodicWave(t), null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.periodicWave = t);
        }
        start(t = 0) {
          if (this._nativeOscillatorNode.start(t), null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.start = t), "closed" !== this.context.state) {
            k(this);
            const t = () => {
              this._nativeOscillatorNode.removeEventListener("ended", t), N(this) && C(this);
            };
            this._nativeOscillatorNode.addEventListener("ended", t);
          }
        }
        stop(t = 0) {
          this._nativeOscillatorNode.stop(t), null !== this._oscillatorNodeRenderer && (this._oscillatorNodeRenderer.stop = t);
        }
      })(Ve, Je, Is, Fs, ke, Oe, ue), Ns = (t => (e, s) => {
        const n = t(e, {buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1}), i = e.createBuffer(1, 2, 44100);
        return n.buffer = i, n.loop = true, n.connect(s), n.start(), () => {
          n.stop(), n.disconnect(s);
        };
      })(Ye), Ps = ((t, e, s, n, i) => (o, {curve: r, oversample: a, ...c}) => {
        const h = o.createWaveShaper(), l = o.createWaveShaper();
        qt(h, c), qt(l, c);
        const u = s(o, {...c, gain: 1}), p = s(o, {...c, gain: -1}), d = s(o, {...c, gain: 1}), f = s(o, {...c, gain: -1});
        let _ = null, m = false, g = null;
        const v = {get bufferSize() {}, get channelCount() {
          return h.channelCount;
        }, set channelCount (t) {
          u.channelCount = t, p.channelCount = t, h.channelCount = t, d.channelCount = t, l.channelCount = t, f.channelCount = t;
        }, get channelCountMode() {
          return h.channelCountMode;
        }, set channelCountMode (t) {
          u.channelCountMode = t, p.channelCountMode = t, h.channelCountMode = t, d.channelCountMode = t, l.channelCountMode = t, f.channelCountMode = t;
        }, get channelInterpretation() {
          return h.channelInterpretation;
        }, set channelInterpretation (t) {
          u.channelInterpretation = t, p.channelInterpretation = t, h.channelInterpretation = t, d.channelInterpretation = t, l.channelInterpretation = t, f.channelInterpretation = t;
        }, get context() {
          return h.context;
        }, get curve() {
          return g;
        }, set curve (s) {
          if (null !== s && s.length < 2) throw e();
          if (null === s) h.curve = s, l.curve = s; else {
            const t = s.length, e = new Float32Array(t + 2 - t % 2), n = new Float32Array(t + 2 - t % 2);
            e[0] = s[0], n[0] = -s[t - 1];
            const i = Math.ceil((t + 1) / 2), o = (t + 1) / 2 - 1;
            for (let r = 1; r < i; r += 1) {
              const a = r / i * o, c = Math.floor(a), h = Math.ceil(a);
              e[r] = c === h ? s[c] : (1 - (a - c)) * s[c] + (1 - (h - a)) * s[h], n[r] = c === h ? -s[t - 1 - c] : -(1 - (a - c)) * s[t - 1 - c] - (1 - (h - a)) * s[t - 1 - h];
            }
            e[i] = t % 2 == 1 ? s[i - 1] : (s[i - 2] + s[i - 1]) / 2, h.curve = e, l.curve = n;
          }
          g = s, m && (n(g) && null === _ ? _ = t(o, u) : null !== _ && (_(), _ = null));
        }, get inputs() {
          return [u];
        }, get numberOfInputs() {
          return h.numberOfInputs;
        }, get numberOfOutputs() {
          return h.numberOfOutputs;
        }, get oversample() {
          return h.oversample;
        }, set oversample (t) {
          h.oversample = t, l.oversample = t;
        }, addEventListener: (...t) => u.addEventListener(t[0], t[1], t[2]), dispatchEvent: (...t) => u.dispatchEvent(t[0]), removeEventListener: (...t) => u.removeEventListener(t[0], t[1], t[2])};
        return null !== r && (v.curve = r instanceof Float32Array ? r : new Float32Array(r)), a !== v.oversample && (v.oversample = a), i(zt(v, d), () => {
          u.connect(h).connect(d), u.connect(p).connect(l).connect(f).connect(d), m = true, n(g) && (_ = t(o, u));
        }, () => {
          u.disconnect(h), h.disconnect(d), u.disconnect(p), p.disconnect(l), l.disconnect(f), f.disconnect(d), m = false, null !== _ && (_(), _ = null);
        });
      })(Ns, At, Bt, se, os), js = ((t, e, s, n, i, o, r) => (a, c) => {
        const h = a.createWaveShaper();
        if (null !== o && "webkitAudioContext" === o.name && undefined === a.createGain().gain.automationRate) return s(a, c);
        qt(h, c);
        const l = null === c.curve || c.curve instanceof Float32Array ? c.curve : new Float32Array(c.curve);
        if (null !== l && l.length < 2) throw e();
        Rt(h, {curve: l}, "curve"), Rt(h, c, "oversample");
        let u = null, p = false;
        return r(h, "curve", t => () => t.call(h), e => s => (e.call(h, s), p && (n(s) && null === u ? u = t(a, h) : n(s) || null === u || (u(), u = null)), s)), i(h, () => {
          p = true, n(h.curve) && (u = t(a, h));
        }, () => {
          p = false, null !== u && (u(), u = null);
        });
      })(Ns, At, Ps, se, os, Ee, ne), Ls = ((t, e, s, n, i, o, r, a, c, h) => (l, {coneInnerAngle: u, coneOuterAngle: p, coneOuterGain: d, distanceModel: f, maxDistance: _, orientationX: m, orientationY: g, orientationZ: v, panningModel: y, positionX: x, positionY: w, positionZ: b, refDistance: T, rolloffFactor: S, ...k}) => {
        const A = l.createPanner();
        if (k.channelCount > 2) throw r();
        if ("max" === k.channelCountMode) throw r();
        qt(A, k);
        const C = {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete"}, O = s(l, {...C, channelInterpretation: "speakers", numberOfInputs: 6}), D = n(l, {...k, gain: 1}), M = n(l, {...C, gain: 1}), E = n(l, {...C, gain: 0}), R = n(l, {...C, gain: 0}), q = n(l, {...C, gain: 0}), I = n(l, {...C, gain: 0}), F = n(l, {...C, gain: 0}), V = i(l, 256, 6, 1), N = o(l, {...C, curve: new Float32Array([1, 1]), oversample: "none"});
        let P = [m, g, v], j = [x, w, b];
        const L = new Float32Array(1);
        V.onaudioprocess = ({inputBuffer: t}) => {
          const e = [c(t, L, 0), c(t, L, 1), c(t, L, 2)];
          e.some((t, e) => t !== P[e]) && (A.setOrientation(...e), P = e);
          const s = [c(t, L, 3), c(t, L, 4), c(t, L, 5)];
          s.some((t, e) => t !== j[e]) && (A.setPosition(...s), j = s);
        }, Object.defineProperty(E.gain, "defaultValue", {get: () => 0}), Object.defineProperty(R.gain, "defaultValue", {get: () => 0}), Object.defineProperty(q.gain, "defaultValue", {get: () => 0}), Object.defineProperty(I.gain, "defaultValue", {get: () => 0}), Object.defineProperty(F.gain, "defaultValue", {get: () => 0});
        const z = {get bufferSize() {}, get channelCount() {
          return A.channelCount;
        }, set channelCount (t) {
          if (t > 2) throw r();
          D.channelCount = t, A.channelCount = t;
        }, get channelCountMode() {
          return A.channelCountMode;
        }, set channelCountMode (t) {
          if ("max" === t) throw r();
          D.channelCountMode = t, A.channelCountMode = t;
        }, get channelInterpretation() {
          return A.channelInterpretation;
        }, set channelInterpretation (t) {
          D.channelInterpretation = t, A.channelInterpretation = t;
        }, get coneInnerAngle() {
          return A.coneInnerAngle;
        }, set coneInnerAngle (t) {
          A.coneInnerAngle = t;
        }, get coneOuterAngle() {
          return A.coneOuterAngle;
        }, set coneOuterAngle (t) {
          A.coneOuterAngle = t;
        }, get coneOuterGain() {
          return A.coneOuterGain;
        }, set coneOuterGain (t) {
          if (t < 0 || t > 1) throw e();
          A.coneOuterGain = t;
        }, get context() {
          return A.context;
        }, get distanceModel() {
          return A.distanceModel;
        }, set distanceModel (t) {
          A.distanceModel = t;
        }, get inputs() {
          return [D];
        }, get maxDistance() {
          return A.maxDistance;
        }, set maxDistance (t) {
          if (t < 0) throw new RangeError;
          A.maxDistance = t;
        }, get numberOfInputs() {
          return A.numberOfInputs;
        }, get numberOfOutputs() {
          return A.numberOfOutputs;
        }, get orientationX() {
          return M.gain;
        }, get orientationY() {
          return E.gain;
        }, get orientationZ() {
          return R.gain;
        }, get panningModel() {
          return A.panningModel;
        }, set panningModel (t) {
          A.panningModel = t;
        }, get positionX() {
          return q.gain;
        }, get positionY() {
          return I.gain;
        }, get positionZ() {
          return F.gain;
        }, get refDistance() {
          return A.refDistance;
        }, set refDistance (t) {
          if (t < 0) throw new RangeError;
          A.refDistance = t;
        }, get rolloffFactor() {
          return A.rolloffFactor;
        }, set rolloffFactor (t) {
          if (t < 0) throw new RangeError;
          A.rolloffFactor = t;
        }, addEventListener: (...t) => D.addEventListener(t[0], t[1], t[2]), dispatchEvent: (...t) => D.dispatchEvent(t[0]), removeEventListener: (...t) => D.removeEventListener(t[0], t[1], t[2])};
        return u !== z.coneInnerAngle && (z.coneInnerAngle = u), p !== z.coneOuterAngle && (z.coneOuterAngle = p), d !== z.coneOuterGain && (z.coneOuterGain = d), f !== z.distanceModel && (z.distanceModel = f), _ !== z.maxDistance && (z.maxDistance = _), m !== z.orientationX.value && (z.orientationX.value = m), g !== z.orientationY.value && (z.orientationY.value = g), v !== z.orientationZ.value && (z.orientationZ.value = v), y !== z.panningModel && (z.panningModel = y), x !== z.positionX.value && (z.positionX.value = x), w !== z.positionY.value && (z.positionY.value = w), b !== z.positionZ.value && (z.positionZ.value = b), T !== z.refDistance && (z.refDistance = T), S !== z.rolloffFactor && (z.rolloffFactor = S), 1 === P[0] && 0 === P[1] && 0 === P[2] || A.setOrientation(...P), 0 === j[0] && 0 === j[1] && 0 === j[2] || A.setPosition(...j), h(zt(z, A), () => {
          D.connect(A), t(D, N, 0, 0), N.connect(M).connect(O, 0, 0), N.connect(E).connect(O, 0, 1), N.connect(R).connect(O, 0, 2), N.connect(q).connect(O, 0, 3), N.connect(I).connect(O, 0, 4), N.connect(F).connect(O, 0, 5), O.connect(V).connect(l.destination);
        }, () => {
          D.disconnect(A), a(D, N, 0, 0), N.disconnect(M), M.disconnect(O), N.disconnect(E), E.disconnect(O), N.disconnect(R), R.disconnect(O), N.disconnect(q), q.disconnect(O), N.disconnect(I), I.disconnect(O), N.disconnect(F), F.disconnect(O), O.disconnect(V), V.disconnect(l.destination);
        });
      })(Y, At, as, Bt, Qt, js, Zt, K, ee, os), zs = (t => (e, s) => {
        const n = e.createPanner();
        return undefined === n.orientationX ? t(e, s) : (qt(n, s), Ft(n, s, "orientationX"), Ft(n, s, "orientationY"), Ft(n, s, "orientationZ"), Ft(n, s, "positionX"), Ft(n, s, "positionY"), Ft(n, s, "positionZ"), Rt(n, s, "coneInnerAngle"), Rt(n, s, "coneOuterAngle"), Rt(n, s, "coneOuterGain"), Rt(n, s, "distanceModel"), Rt(n, s, "maxDistance"), Rt(n, s, "panningModel"), Rt(n, s, "refDistance"), Rt(n, s, "rolloffFactor"), n);
      })(Ls), Ws = ((t, e, s, n, i, o, r, a, c, h) => () => {
        const l = new WeakMap;
        let u = null;
        return {render(p, d) {
          const f = l.get(d);
          return undefined !== f ? Promise.resolve(f) : (async (p, d) => {
            let f = null, _ = o(p);
            const m = {channelCount: _.channelCount, channelCountMode: _.channelCountMode, channelInterpretation: _.channelInterpretation}, g = {...m, coneInnerAngle: _.coneInnerAngle, coneOuterAngle: _.coneOuterAngle, coneOuterGain: _.coneOuterGain, distanceModel: _.distanceModel, maxDistance: _.maxDistance, panningModel: _.panningModel, refDistance: _.refDistance, rolloffFactor: _.rolloffFactor}, v = M(_, d);
            if ("bufferSize" in _) f = n(d, {...m, gain: 1}); else if (!v) {
              const t = {...g, orientationX: _.orientationX.value, orientationY: _.orientationY.value, orientationZ: _.orientationZ.value, positionX: _.positionX.value, positionY: _.positionY.value, positionZ: _.positionZ.value};
              _ = i(d, t);
            }
            if (l.set(d, null === f ? _ : f), null !== f) {
              if (null === u) {
                if (null === r) throw new Error("Missing the native OfflineAudioContext constructor.");
                const t = new r(6, p.context.length, d.sampleRate), n = e(t, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: 6});
                n.connect(t.destination), u = (async () => {
                  const e = await Promise.all([p.orientationX, p.orientationY, p.orientationZ, p.positionX, p.positionY, p.positionZ].map(async (e, n) => {
                    const i = s(t, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: 0 === n ? 1 : 0});
                    return await a(t, e, i.offset), i;
                  }));
                  for (let t = 0; t < 6; t += 1) e[t].connect(n, 0, t), e[t].start(0);
                  return h(t);
                })();
              }
              const t = await u, o = n(d, {...m, gain: 1});
              await c(p, d, o);
              const l = [];
              for (let e = 0; e < t.numberOfChannels; e += 1) l.push(t.getChannelData(e));
              let _ = [l[0][0], l[1][0], l[2][0]], v = [l[3][0], l[4][0], l[5][0]], y = n(d, {...m, gain: 1}), x = i(d, {...g, orientationX: _[0], orientationY: _[1], orientationZ: _[2], positionX: v[0], positionY: v[1], positionZ: v[2]});
              o.connect(y).connect(x.inputs[0]), x.connect(f);
              for (let e = 128; e < t.length; e += 128) {
                const t = [l[0][e], l[1][e], l[2][e]], s = [l[3][e], l[4][e], l[5][e]];
                if (t.some((t, e) => t !== _[e]) || s.some((t, e) => t !== v[e])) {
                  _ = t, v = s;
                  const r = e / d.sampleRate;
                  y.gain.setValueAtTime(0, r), y = n(d, {...m, gain: 0}), x = i(d, {...g, orientationX: _[0], orientationY: _[1], orientationZ: _[2], positionX: v[0], positionY: v[1], positionZ: v[2]}), y.gain.setValueAtTime(1, r), o.connect(y).connect(x.inputs[0]), x.connect(f);
                }
              }
              return f;
            }
            return v ? (await t(d, p.orientationX, _.orientationX), await t(d, p.orientationY, _.orientationY), await t(d, p.orientationZ, _.orientationZ), await t(d, p.positionX, _.positionX), await t(d, p.positionY, _.positionY), await t(d, p.positionZ, _.positionZ)) : (await a(d, p.orientationX, _.orientationX), await a(d, p.orientationY, _.orientationY), await a(d, p.orientationZ, _.orientationZ), await a(d, p.positionX, _.positionX), await a(d, p.positionY, _.positionY), await a(d, p.positionZ, _.positionZ)), X(_) ? await c(p, d, _.inputs[0]) : await c(p, d, _), _;
          })(p, d);
        }};
      })(Xe, as, ds, Bt, zs, tt, Ce, $e, Te, Cs), Bs = ((t, e, s, n, i, o, r) => class extends t {
        constructor(t, a) {
          const c = i(t), h = {...$t, ...a}, l = s(c, h), u = o(c);
          super(t, false, l, u ? n() : null), this._nativePannerNode = l, this._orientationX = e(this, u, l.orientationX, V, F), this._orientationY = e(this, u, l.orientationY, V, F), this._orientationZ = e(this, u, l.orientationZ, V, F), this._positionX = e(this, u, l.positionX, V, F), this._positionY = e(this, u, l.positionY, V, F), this._positionZ = e(this, u, l.positionZ, V, F), r(this, 1);
        }
        get coneInnerAngle() {
          return this._nativePannerNode.coneInnerAngle;
        }
        set coneInnerAngle (t) {
          this._nativePannerNode.coneInnerAngle = t;
        }
        get coneOuterAngle() {
          return this._nativePannerNode.coneOuterAngle;
        }
        set coneOuterAngle (t) {
          this._nativePannerNode.coneOuterAngle = t;
        }
        get coneOuterGain() {
          return this._nativePannerNode.coneOuterGain;
        }
        set coneOuterGain (t) {
          this._nativePannerNode.coneOuterGain = t;
        }
        get distanceModel() {
          return this._nativePannerNode.distanceModel;
        }
        set distanceModel (t) {
          this._nativePannerNode.distanceModel = t;
        }
        get maxDistance() {
          return this._nativePannerNode.maxDistance;
        }
        set maxDistance (t) {
          this._nativePannerNode.maxDistance = t;
        }
        get orientationX() {
          return this._orientationX;
        }
        get orientationY() {
          return this._orientationY;
        }
        get orientationZ() {
          return this._orientationZ;
        }
        get panningModel() {
          return this._nativePannerNode.panningModel;
        }
        set panningModel (t) {
          this._nativePannerNode.panningModel = t;
        }
        get positionX() {
          return this._positionX;
        }
        get positionY() {
          return this._positionY;
        }
        get positionZ() {
          return this._positionZ;
        }
        get refDistance() {
          return this._nativePannerNode.refDistance;
        }
        set refDistance (t) {
          this._nativePannerNode.refDistance = t;
        }
        get rolloffFactor() {
          return this._nativePannerNode.rolloffFactor;
        }
        set rolloffFactor (t) {
          this._nativePannerNode.rolloffFactor = t;
        }
      })(Ve, Je, zs, Ws, ke, Oe, ns), Us = (t => (e, {disableNormalization: s, imag: n, real: i}) => {
        const o = n instanceof Float32Array ? n : new Float32Array(n), r = i instanceof Float32Array ? i : new Float32Array(i), a = e.createPeriodicWave(r, o, {disableNormalization: s});
        if (Array.from(n).length < 2) throw t();
        return a;
      })(R), Gs = ((t, e, s, n) => class n {
        constructor(n, i) {
          const o = e(n), r = (t => {
            const {imag: e, real: s} = t;
            return undefined === e ? undefined === s ? {...t, imag: [0, 0], real: [0, 0]} : {...t, imag: Array.from(s, () => 0), real: s} : undefined === s ? {...t, imag: e, real: Array.from(e, () => 0)} : {...t, imag: e, real: s};
          })({...Ht, ...i}), a = t(o, r);
          return s.add(a), a;
        }
        static [Symbol.hasInstance](t) {
          return null !== t && "object" == typeof t && Object.getPrototypeOf(t) === n.prototype || s.has(t);
        }
      })(Us, ke, new WeakSet), Qs = ((t, e, s, n, i, o) => {
        const r = 16385, a = new Float32Array([1, 1]), c = Math.PI / 2, h = {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete"}, l = {...h, oversample: "none"}, u = (t, o, u, p, d) => {
          if (1 === o) return ((t, e, i, o) => {
            const u = new Float32Array(r), p = new Float32Array(r);
            for (let t = 0; t < r; t += 1) {
              const e = t / 16384 * c;
              u[t] = Math.cos(e), p[t] = Math.sin(e);
            }
            const d = s(t, {...h, gain: 0}), f = n(t, {...l, curve: u}), _ = n(t, {...l, curve: a}), m = s(t, {...h, gain: 0}), g = n(t, {...l, curve: p});
            return {connectGraph() {
              e.connect(d), e.connect(undefined === _.inputs ? _ : _.inputs[0]), e.connect(m), _.connect(i), i.connect(undefined === f.inputs ? f : f.inputs[0]), i.connect(undefined === g.inputs ? g : g.inputs[0]), f.connect(d.gain), g.connect(m.gain), d.connect(o, 0, 0), m.connect(o, 0, 1);
            }, disconnectGraph() {
              e.disconnect(d), e.disconnect(undefined === _.inputs ? _ : _.inputs[0]), e.disconnect(m), _.disconnect(i), i.disconnect(undefined === f.inputs ? f : f.inputs[0]), i.disconnect(undefined === g.inputs ? g : g.inputs[0]), f.disconnect(d.gain), g.disconnect(m.gain), d.disconnect(o, 0, 0), m.disconnect(o, 0, 1);
            }};
          })(t, u, p, d);
          if (2 === o) return ((t, i, o, u) => {
            const p = new Float32Array(r), d = new Float32Array(r), f = new Float32Array(r), _ = new Float32Array(r), m = Math.floor(8192.5);
            for (let t = 0; t < r; t += 1) if (t > m) {
              const e = (t - m) / (16384 - m) * c;
              p[t] = Math.cos(e), d[t] = Math.sin(e), f[t] = 0, _[t] = 1;
            } else {
              const e = t / (16384 - m) * c;
              p[t] = 1, d[t] = 0, f[t] = Math.cos(e), _[t] = Math.sin(e);
            }
            const g = e(t, {channelCount: 2, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: 2}), v = s(t, {...h, gain: 0}), y = n(t, {...l, curve: p}), x = s(t, {...h, gain: 0}), w = n(t, {...l, curve: d}), b = n(t, {...l, curve: a}), T = s(t, {...h, gain: 0}), S = n(t, {...l, curve: f}), k = s(t, {...h, gain: 0}), A = n(t, {...l, curve: _});
            return {connectGraph() {
              i.connect(g), i.connect(undefined === b.inputs ? b : b.inputs[0]), g.connect(v, 0), g.connect(x, 0), g.connect(T, 1), g.connect(k, 1), b.connect(o), o.connect(undefined === y.inputs ? y : y.inputs[0]), o.connect(undefined === w.inputs ? w : w.inputs[0]), o.connect(undefined === S.inputs ? S : S.inputs[0]), o.connect(undefined === A.inputs ? A : A.inputs[0]), y.connect(v.gain), w.connect(x.gain), S.connect(T.gain), A.connect(k.gain), v.connect(u, 0, 0), T.connect(u, 0, 0), x.connect(u, 0, 1), k.connect(u, 0, 1);
            }, disconnectGraph() {
              i.disconnect(g), i.disconnect(undefined === b.inputs ? b : b.inputs[0]), g.disconnect(v, 0), g.disconnect(x, 0), g.disconnect(T, 1), g.disconnect(k, 1), b.disconnect(o), o.disconnect(undefined === y.inputs ? y : y.inputs[0]), o.disconnect(undefined === w.inputs ? w : w.inputs[0]), o.disconnect(undefined === S.inputs ? S : S.inputs[0]), o.disconnect(undefined === A.inputs ? A : A.inputs[0]), y.disconnect(v.gain), w.disconnect(x.gain), S.disconnect(T.gain), A.disconnect(k.gain), v.disconnect(u, 0, 0), T.disconnect(u, 0, 0), x.disconnect(u, 0, 1), k.disconnect(u, 0, 1);
            }};
          })(t, u, p, d);
          throw i();
        };
        return (e, {channelCount: n, channelCountMode: r, pan: a, ...c}) => {
          if ("max" === r) throw i();
          const h = t(e, {...c, channelCount: 1, channelCountMode: r, numberOfInputs: 2}), l = s(e, {...c, channelCount: n, channelCountMode: r, gain: 1}), p = s(e, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: a});
          let {connectGraph: d, disconnectGraph: f} = u(e, n, l, p, h);
          Object.defineProperty(p.gain, "defaultValue", {get: () => 0}), Object.defineProperty(p.gain, "maxValue", {get: () => 1}), Object.defineProperty(p.gain, "minValue", {get: () => -1});
          const _ = {get bufferSize() {}, get channelCount() {
            return l.channelCount;
          }, set channelCount (t) {
            l.channelCount !== t && (m && f(), {connectGraph: d, disconnectGraph: f} = u(e, t, l, p, h), m && d()), l.channelCount = t;
          }, get channelCountMode() {
            return l.channelCountMode;
          }, set channelCountMode (t) {
            if ("clamped-max" === t || "max" === t) throw i();
            l.channelCountMode = t;
          }, get channelInterpretation() {
            return l.channelInterpretation;
          }, set channelInterpretation (t) {
            l.channelInterpretation = t;
          }, get context() {
            return l.context;
          }, get inputs() {
            return [l];
          }, get numberOfInputs() {
            return l.numberOfInputs;
          }, get numberOfOutputs() {
            return l.numberOfOutputs;
          }, get pan() {
            return p.gain;
          }, addEventListener: (...t) => l.addEventListener(t[0], t[1], t[2]), dispatchEvent: (...t) => l.dispatchEvent(t[0]), removeEventListener: (...t) => l.removeEventListener(t[0], t[1], t[2])};
          let m = false;
          return o(zt(_, h), () => {
            d(), m = true;
          }, () => {
            f(), m = false;
          });
        };
      })(as, Lt, Bt, js, Zt, os), Zs = ((t, e) => (s, n) => {
        const i = n.channelCountMode;
        if ("clamped-max" === i) throw e();
        if (undefined === s.createStereoPanner) return t(s, n);
        const o = s.createStereoPanner();
        return qt(o, n), Ft(o, n, "pan"), Object.defineProperty(o, "channelCountMode", {get: () => i, set: t => {
          if (t !== i) throw e();
        }}), o;
      })(Qs, Zt), Xs = ((t, e, s, n, i) => () => {
        const o = new WeakMap;
        return {render(r, a) {
          const c = o.get(a);
          return undefined !== c ? Promise.resolve(c) : (async (r, a) => {
            let c = s(r);
            const h = M(c, a);
            if (!h) {
              const t = {channelCount: c.channelCount, channelCountMode: c.channelCountMode, channelInterpretation: c.channelInterpretation, pan: c.pan.value};
              c = e(a, t);
            }
            return o.set(a, c), h ? await t(a, r.pan, c.pan) : await n(a, r.pan, c.pan), X(c) ? await i(r, a, c.inputs[0]) : await i(r, a, c), c;
          })(r, a);
        }};
      })(Xe, Zs, tt, $e, Te), Ys = ((t, e, s, n, i, o) => class extends t {
        constructor(t, r) {
          const a = i(t), c = {...Jt, ...r}, h = s(a, c), l = o(a);
          super(t, false, h, l ? n() : null), this._pan = e(this, l, h.pan);
        }
        get pan() {
          return this._pan;
        }
      })(Ve, Je, Zs, Xs, ke, Oe), $s = ((t, e, s) => () => {
        const n = new WeakMap;
        return {render(i, o) {
          const r = n.get(o);
          return undefined !== r ? Promise.resolve(r) : (async (i, o) => {
            let r = e(i);
            if (!M(r, o)) {
              const e = {channelCount: r.channelCount, channelCountMode: r.channelCountMode, channelInterpretation: r.channelInterpretation, curve: r.curve, oversample: r.oversample};
              r = t(o, e);
            }
            return n.set(o, r), X(r) ? await s(i, o, r.inputs[0]) : await s(i, o, r), r;
          })(i, o);
        }};
      })(js, tt, Te), Hs = ((t, e, s, n, i, o, r) => class extends t {
        constructor(t, e) {
          const a = i(t), c = {...te, ...e}, h = s(a, c);
          super(t, true, h, o(a) ? n() : null), this._isCurveNullified = false, this._nativeWaveShaperNode = h, r(this, 1);
        }
        get curve() {
          return this._isCurveNullified ? null : this._nativeWaveShaperNode.curve;
        }
        set curve (t) {
          if (null === t) this._isCurveNullified = true, this._nativeWaveShaperNode.curve = new Float32Array([0, 0]); else {
            if (t.length < 2) throw e();
            this._isCurveNullified = false, this._nativeWaveShaperNode.curve = t;
          }
        }
        get oversample() {
          return this._nativeWaveShaperNode.oversample;
        }
        set oversample (t) {
          this._nativeWaveShaperNode.oversample = t;
        }
      })(Ve, At, js, $s, ke, Oe, ns), Js = (t => null !== t && t.isSecureContext)(xe), Ks = (t => (e, s, n) => {
        Object.defineProperties(t, {currentFrame: {configurable: true, get: () => Math.round(e * s)}, currentTime: {configurable: true, get: () => e}});
        try {
          return n();
        } finally {
          null !== t && (delete t.currentFrame, delete t.currentTime);
        }
      })(xe), tn = new WeakMap, en = ((t, e) => s => {
        let n = t.get(s);
        if (undefined !== n) return n;
        if (null === e) throw new Error("Missing the native OfflineAudioContext constructor.");
        return n = new e(1, 1, 44100), t.set(s, n), n;
      })(tn, Ce), sn = Js ? ((t, e, s, n, i, o, r, a, c, h, l, u, p) => {
        let d = 0;
        return (_, m, g = {credentials: "omit"}) => {
          const w = l.get(_);
          if (undefined !== w && w.has(m)) return Promise.resolve();
          const b = h.get(_);
          if (undefined !== b) {
            const t = b.get(m);
            if (undefined !== t) return t;
          }
          const T = o(_), S = undefined === T.audioWorklet ? i(m).then(([t, e]) => {
            const [n, i] = v(t, e);
            return s(`${n};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${i}\n})})(window,'_AWGS')`);
          }).then(() => {
            const t = p._AWGS.pop();
            if (undefined === t) throw new SyntaxError;
            n(T.currentTime, T.sampleRate, () => t(class {}, undefined, (t, s) => {
              if ("" === t.trim()) throw e();
              const n = f.get(T);
              if (undefined !== n) {
                if (n.has(t)) throw e();
                x(s), y(s.parameterDescriptors), n.set(t, s);
              } else x(s), y(s.parameterDescriptors), f.set(T, new Map([[t, s]]));
            }, T.sampleRate, undefined, undefined));
          }) : Promise.all([i(m), Promise.resolve(t(u, u))]).then(([[t, e], s]) => {
            const n = d + 1;
            d = n;
            const [i, o] = v(t, e), h = new Blob([`${i};((AudioWorkletProcessor,registerProcessor)=>{${o}\n})(${s ? "AudioWorkletProcessor" : "class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${s ? "" : "__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${s ? "" : "i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${n}',class extends AudioWorkletProcessor{process(){return !1}})`], {type: "application/javascript; charset=utf-8"}), l = URL.createObjectURL(h);
            return T.audioWorklet.addModule(l, g).then(() => {
              if (a(T)) return T;
              const t = r(T);
              return t.audioWorklet.addModule(l, g).then(() => t);
            }).then(t => {
              if (null === c) throw new SyntaxError;
              try {
                new c(t, `__sac${n}`);
              } catch {
                throw new SyntaxError;
              }
            }).finally(() => URL.revokeObjectURL(l));
          });
          return undefined === b ? h.set(_, new Map([[m, S]])) : b.set(m, S), S.then(() => {
            const t = l.get(_);
            undefined === t ? l.set(_, new Set([m])) : t.add(m);
          }).finally(() => {
            const t = h.get(_);
            undefined !== t && t.delete(m);
          }), S;
        };
      })(ge, Zt, (t => e => new Promise((s, n) => {
        if (null === t) return void n(new SyntaxError);
        const i = t.document.head;
        if (null === i) n(new SyntaxError); else {
          const o = t.document.createElement("script"), r = new Blob([e], {type: "application/javascript"}), a = URL.createObjectURL(r), c = t.onerror, h = () => {
            t.onerror = c, URL.revokeObjectURL(a);
          };
          t.onerror = (e, s, i, o, r) => s === a || s === t.location.href && 1 === i && 1 === o ? (h(), n(r), false) : null !== c ? c(e, s, i, o, r) : undefined, o.onerror = () => {
            h(), n(new SyntaxError);
          }, o.onload = () => {
            h(), s();
          }, o.src = a, o.type = "module", i.appendChild(o);
        }
      }))(xe), Ks, async t => {
        try {
          const e = await fetch(t);
          if (e.ok) return [await e.text(), e.url];
        } catch {}
        throw new DOMException("", "AbortError");
      }, ke, en, Oe, Fe, new WeakMap, new WeakMap, ((t, e) => async () => {
        if (null === t) return true;
        if (null === e) return false;
        const s = new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'], {type: "application/javascript; charset=utf-8"}), n = new e(1, 128, 44100), i = URL.createObjectURL(s);
        let o = false, r = false;
        try {
          await n.audioWorklet.addModule(i);
          const e = new t(n, "a", {numberOfOutputs: 0}), s = n.createOscillator();
          e.port.onmessage = () => o = true, e.onprocessorerror = () => r = true, s.connect(e), s.start(0), await n.startRendering(), await new Promise(t => setTimeout(t));
        } catch {} finally {
          URL.revokeObjectURL(i);
        }
        return o && !r;
      })(Fe, Ce), xe) : undefined, nn = ((t, e) => s => t(s) || e(s))(Re, Oe), on = ((t, e, s, n, i, o, r, a, c, h, l) => (s, n) => {
        const u = r(s) ? s : o(s);
        if (i.has(n)) {
          const t = new DOMException("", "DataCloneError");
          return Promise.reject(t);
        }
        try {
          i.add(n);
        } catch {}
        return e(c, () => c(u)) ? u.decodeAudioData(n).then(s => (wt(n).catch(() => {}), e(a, () => a(s)) || l(s), t.add(s), s)) : new Promise((e, s) => {
          const i = async () => {
            try {
              await wt(n);
            } catch {}
          }, o = t => {
            s(t), i();
          };
          try {
            u.decodeAudioData(n, s => {
              "function" != typeof s.copyFromChannel && (h(s), q(s)), t.add(s), i().then(() => e(s));
            }, t => {
              o(null === t ? new DOMException("", "EncodingError") : t);
            });
          } catch (t) {
            o(t);
          }
        });
      })(je, ge, 0, 0, new WeakSet, ke, nn, E, Et, Be, Ue), rn = ((t, e, s, n, i, o, r, a, c, h, l, u, p, d, f, _, m, g, v, y) => class extends f {
        constructor(e, s) {
          super(e, s), this._nativeContext = e, this._audioWorklet = undefined === t ? undefined : {addModule: (e, s) => t(this, e, s)};
        }
        get audioWorklet() {
          return this._audioWorklet;
        }
        createAnalyser() {
          return new e(this);
        }
        createBiquadFilter() {
          return new i(this);
        }
        createBuffer(t, e, n) {
          return new s({length: e, numberOfChannels: t, sampleRate: n});
        }
        createBufferSource() {
          return new n(this);
        }
        createChannelMerger(t = 6) {
          return new o(this, {numberOfInputs: t});
        }
        createChannelSplitter(t = 6) {
          return new r(this, {numberOfOutputs: t});
        }
        createConstantSource() {
          return new a(this);
        }
        createConvolver() {
          return new c(this);
        }
        createDelay(t = 1) {
          return new l(this, {maxDelayTime: t});
        }
        createDynamicsCompressor() {
          return new u(this);
        }
        createGain() {
          return new p(this);
        }
        createIIRFilter(t, e) {
          return new d(this, {feedback: e, feedforward: t});
        }
        createOscillator() {
          return new _(this);
        }
        createPanner() {
          return new m(this);
        }
        createPeriodicWave(t, e, s = {disableNormalization: false}) {
          return new g(this, {...s, imag: e, real: t});
        }
        createStereoPanner() {
          return new v(this);
        }
        createWaveShaper() {
          return new y(this);
        }
        decodeAudioData(t, e, s) {
          return h(this._nativeContext, t).then(t => ("function" == typeof e && e(t), t), t => {
            throw "function" == typeof s && s(t), t;
          });
        }
      })(sn, Pe, Ge, ts, is, hs, us, _s, vs, on, xs, Ts, ks, Ms, qs, Vs, Bs, Gs, Ys, Hs), an = ((t, e, s, n) => class extends t {
        constructor(t, e) {
          const i = s(t), o = ((t, e) => t.createMediaElementSource(e.mediaElement))(i, e);
          if (n(i)) throw TypeError();
          super(t, true, o, null), this._nativeMediaElementAudioSourceNode = o;
        }
        get mediaElement() {
          return this._nativeMediaElementAudioSourceNode.mediaElement;
        }
      })(Ve, 0, ke, Oe), cn = ((t, e, s, n) => class extends t {
        constructor(t, e) {
          const i = s(t);
          if (n(i)) throw new TypeError;
          const o = ((t, e) => {
            const s = t.createMediaStreamDestination();
            return qt(s, e), 1 === s.numberOfOutputs && Object.defineProperty(s, "numberOfOutputs", {get: () => 0}), s;
          })(i, {...Mt, ...e});
          super(t, false, o, null), this._nativeMediaStreamAudioDestinationNode = o;
        }
        get stream() {
          return this._nativeMediaStreamAudioDestinationNode.stream;
        }
      })(Ve, 0, ke, Oe), hn = ((t, e, s, n) => class extends t {
        constructor(t, e) {
          const i = s(t), o = ((t, {mediaStream: e}) => {
            const s = e.getAudioTracks();
            s.sort((t, e) => t.id < e.id ? -1 : t.id > e.id ? 1 : 0);
            const n = s.slice(0, 1), i = t.createMediaStreamSource(new MediaStream(n));
            return Object.defineProperty(i, "mediaStream", {value: e}), i;
          })(i, e);
          if (n(i)) throw new TypeError;
          super(t, true, o, null), this._nativeMediaStreamAudioSourceNode = o;
        }
        get mediaStream() {
          return this._nativeMediaStreamAudioSourceNode.mediaStream;
        }
      })(Ve, 0, ke, Oe), ln = ((t, e) => (s, {mediaStreamTrack: n}) => {
        if ("function" == typeof s.createMediaStreamTrackSource) return s.createMediaStreamTrackSource(n);
        const i = new MediaStream([n]), o = s.createMediaStreamSource(i);
        if ("audio" !== n.kind) throw t();
        if (e(s)) throw new TypeError;
        return o;
      })(At, Oe), un = ((t, e, s) => class extends t {
        constructor(t, n) {
          const i = s(t);
          super(t, true, e(i, n), null);
        }
      })(Ve, ln, ke), pn = ((t, e, s, n, i, o, r, a, c) => class extends t {
        constructor(t = {}) {
          if (null === c) throw new Error("Missing the native AudioContext constructor.");
          let e;
          try {
            e = new c(t);
          } catch (t) {
            if (12 === t.code && "sampleRate is not in range" === t.message) throw s();
            throw t;
          }
          if (null === e) throw n();
          if (!(t => undefined === t || "number" == typeof t || "string" == typeof t && ("balanced" === t || "interactive" === t || "playback" === t))(t.latencyHint)) throw new TypeError(`The provided value '${t.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);
          if (undefined !== t.sampleRate && e.sampleRate !== t.sampleRate) throw s();
          super(e, 2);
          const {latencyHint: i} = t, {sampleRate: o} = e;
          if (this._baseLatency = "number" == typeof e.baseLatency ? e.baseLatency : "balanced" === i ? 512 / o : "interactive" === i || undefined === i ? 256 / o : "playback" === i ? 1024 / o : 128 * Math.max(2, Math.min(128, Math.round(i * o / 128))) / o, this._nativeAudioContext = e, "webkitAudioContext" === c.name ? (this._nativeGainNode = e.createGain(), this._nativeOscillatorNode = e.createOscillator(), this._nativeGainNode.gain.value = 1e-37, this._nativeOscillatorNode.connect(this._nativeGainNode).connect(e.destination), this._nativeOscillatorNode.start()) : (this._nativeGainNode = null, this._nativeOscillatorNode = null), this._state = null, "running" === e.state) {
            this._state = "suspended";
            const t = () => {
              "suspended" === this._state && (this._state = null), e.removeEventListener("statechange", t);
            };
            e.addEventListener("statechange", t);
          }
        }
        get baseLatency() {
          return this._baseLatency;
        }
        get state() {
          return null !== this._state ? this._state : this._nativeAudioContext.state;
        }
        close() {
          return "closed" === this.state ? this._nativeAudioContext.close().then(() => {
            throw e();
          }) : ("suspended" === this._state && (this._state = null), this._nativeAudioContext.close().then(() => {
            null !== this._nativeGainNode && null !== this._nativeOscillatorNode && (this._nativeOscillatorNode.stop(), this._nativeGainNode.disconnect(), this._nativeOscillatorNode.disconnect()), W(this);
          }));
        }
        createMediaElementSource(t) {
          return new i(this, {mediaElement: t});
        }
        createMediaStreamDestination() {
          return new o(this);
        }
        createMediaStreamSource(t) {
          return new r(this, {mediaStream: t});
        }
        createMediaStreamTrackSource(t) {
          return new a(this, {mediaStreamTrack: t});
        }
        resume() {
          return "suspended" === this._state ? new Promise((t, e) => {
            const s = () => {
              this._nativeAudioContext.removeEventListener("statechange", s), "running" === this._nativeAudioContext.state ? t() : this.resume().then(t, e);
            };
            this._nativeAudioContext.addEventListener("statechange", s);
          }) : this._nativeAudioContext.resume().catch(t => {
            if (undefined === t || 15 === t.code) throw e();
            throw t;
          });
        }
        suspend() {
          return this._nativeAudioContext.suspend().catch(t => {
            if (undefined === t) throw e();
            throw t;
          });
        }
      })(rn, At, Zt, Kt, an, cn, hn, un, Ee), dn = (t => e => {
        const s = t.get(e);
        if (undefined === s) throw new Error("The context has no set of AudioWorkletNodes.");
        return s;
      })(Rs), fn = (t => (e, s) => {
        t(e).add(s);
      })(dn), _n = (t => (e, s, n = 0, i = 0) => {
        const o = e[n];
        if (undefined === o) throw t();
        return rt(s) ? o.connect(s, 0, i) : o.connect(s, 0);
      })(R), mn = (t => (e, s) => {
        t(e).delete(s);
      })(dn), gn = (t => (e, s = undefined, n = undefined, i = 0) => undefined === s ? e.forEach(t => t.disconnect()) : "number" == typeof s ? Tt(t, e, s).disconnect() : rt(s) ? undefined === n ? e.forEach(t => t.disconnect(s)) : undefined === i ? Tt(t, e, n).disconnect(s, 0) : Tt(t, e, n).disconnect(s, 0, i) : undefined === n ? e.forEach(t => t.disconnect(s)) : Tt(t, e, n).disconnect(s, 0))(R), vn = new WeakMap, yn = ((t, e) => s => e(t, s))(vn, w), xn = ((t, e, s, n, i, o, r, a, c, h, l, u, p) => (d, f, m, g) => {
        if (0 === g.numberOfInputs && 0 === g.numberOfOutputs) throw c();
        const v = Array.isArray(g.outputChannelCount) ? g.outputChannelCount : Array.from(g.outputChannelCount);
        if (v.some(t => t < 1)) throw c();
        if (v.length !== g.numberOfOutputs) throw e();
        if ("explicit" !== g.channelCountMode) throw c();
        const y = g.channelCount * g.numberOfInputs, x = v.reduce((t, e) => t + e, 0), w = undefined === m.parameterDescriptors ? 0 : m.parameterDescriptors.length;
        if (y + w > 6 || x > 6) throw c();
        const b = new MessageChannel, T = [], S = [];
        for (let t = 0; t < g.numberOfInputs; t += 1) T.push(r(d, {channelCount: g.channelCount, channelCountMode: g.channelCountMode, channelInterpretation: g.channelInterpretation, gain: 1})), S.push(i(d, {channelCount: g.channelCount, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: g.channelCount}));
        const k = [];
        if (undefined !== m.parameterDescriptors) for (const {defaultValue: t, maxValue: e, minValue: s, name: n} of m.parameterDescriptors) {
          const i = o(d, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: undefined !== g.parameterData[n] ? g.parameterData[n] : undefined === t ? 0 : t});
          Object.defineProperties(i.offset, {defaultValue: {get: () => undefined === t ? 0 : t}, maxValue: {get: () => undefined === e ? V : e}, minValue: {get: () => undefined === s ? F : s}}), k.push(i);
        }
        const A = n(d, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: Math.max(1, y + w)}), C = Pt(f, d.sampleRate), O = a(d, C, y + w, Math.max(1, x)), D = i(d, {channelCount: Math.max(1, x), channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: Math.max(1, x)}), M = [];
        for (let t = 0; t < g.numberOfOutputs; t += 1) M.push(n(d, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: v[t]}));
        for (let t = 0; t < g.numberOfInputs; t += 1) {
          T[t].connect(S[t]);
          for (let e = 0; e < g.channelCount; e += 1) S[t].connect(A, e, t * g.channelCount + e);
        }
        const E = new lt(undefined === m.parameterDescriptors ? [] : m.parameterDescriptors.map(({name: t}, e) => {
          const s = k[e];
          return s.connect(A, 0, y + e), s.start(0), [t, s.offset];
        }));
        A.connect(O);
        let R = g.channelInterpretation, q = null;
        const I = 0 === g.numberOfOutputs ? [O] : M, N = {get bufferSize() {
          return C;
        }, get channelCount() {
          return g.channelCount;
        }, set channelCount (t) {
          throw s();
        }, get channelCountMode() {
          return g.channelCountMode;
        }, set channelCountMode (t) {
          throw s();
        }, get channelInterpretation() {
          return R;
        }, set channelInterpretation (t) {
          for (const e of T) e.channelInterpretation = t;
          R = t;
        }, get context() {
          return O.context;
        }, get inputs() {
          return T;
        }, get numberOfInputs() {
          return g.numberOfInputs;
        }, get numberOfOutputs() {
          return g.numberOfOutputs;
        }, get onprocessorerror() {
          return q;
        }, set onprocessorerror (t) {
          "function" == typeof q && N.removeEventListener("processorerror", q), q = "function" == typeof t ? t : null, "function" == typeof q && N.addEventListener("processorerror", q);
        }, get parameters() {
          return E;
        }, get port() {
          return b.port2;
        }, addEventListener: (...t) => O.addEventListener(t[0], t[1], t[2]), connect: t.bind(null, I), disconnect: h.bind(null, I), dispatchEvent: (...t) => O.dispatchEvent(t[0]), removeEventListener: (...t) => O.removeEventListener(t[0], t[1], t[2])}, P = new Map;
        var j, L;
        b.port1.addEventListener = (j = b.port1.addEventListener, (...t) => {
          if ("message" === t[0]) {
            const e = "function" == typeof t[1] ? t[1] : "object" == typeof t[1] && null !== t[1] && "function" == typeof t[1].handleEvent ? t[1].handleEvent : null;
            if (null !== e) {
              const s = P.get(t[1]);
              undefined !== s ? t[1] = s : (t[1] = t => {
                l(d.currentTime, d.sampleRate, () => e(t));
              }, P.set(e, t[1]));
            }
          }
          return j.call(b.port1, t[0], t[1], t[2]);
        }), b.port1.removeEventListener = (L = b.port1.removeEventListener, (...t) => {
          if ("message" === t[0]) {
            const e = P.get(t[1]);
            undefined !== e && (P.delete(t[1]), t[1] = e);
          }
          return L.call(b.port1, t[0], t[1], t[2]);
        });
        let z = null;
        Object.defineProperty(b.port1, "onmessage", {get: () => z, set: t => {
          "function" == typeof z && b.port1.removeEventListener("message", z), z = "function" == typeof t ? t : null, "function" == typeof z && (b.port1.addEventListener("message", z), b.port1.start());
        }}), m.prototype.port = b.port1;
        let W = null;
        const B = ((t, e, s, n) => {
          let i = _.get(t);
          undefined === i && (i = new WeakMap, _.set(t, i));
          const o = (async (t, e) => {
            const s = await (t => new Promise((e, s) => {
              const {port1: n, port2: i} = new MessageChannel;
              n.onmessage = ({data: t}) => {
                n.close(), i.close(), e(t);
              }, n.onmessageerror = ({data: t}) => {
                n.close(), i.close(), s(t);
              }, i.postMessage(t);
            }))(e);
            return new t(s);
          })(s, n);
          return i.set(e, o), o;
        })(d, N, m, g);
        B.then(t => W = t);
        const U = ft(g.numberOfInputs, g.channelCount), G = ft(g.numberOfOutputs, v), Q = undefined === m.parameterDescriptors ? [] : m.parameterDescriptors.reduce((t, {name: e}) => ({...t, [e]: new Float32Array(128)}), {});
        let Z = true;
        const X = () => {
          g.numberOfOutputs > 0 && O.disconnect(D);
          for (let t = 0, e = 0; t < g.numberOfOutputs; t += 1) {
            const s = M[t];
            for (let n = 0; n < v[t]; n += 1) D.disconnect(s, e + n, n);
            e += v[t];
          }
        }, Y = new Map;
        O.onaudioprocess = ({inputBuffer: t, outputBuffer: e}) => {
          if (null !== W) {
            const s = u(N);
            for (let n = 0; n < C; n += 128) {
              for (let e = 0; e < g.numberOfInputs; e += 1) for (let s = 0; s < g.channelCount; s += 1) pt(t, U[e], s, s, n);
              undefined !== m.parameterDescriptors && m.parameterDescriptors.forEach(({name: e}, s) => {
                pt(t, Q, e, y + s, n);
              });
              for (let t = 0; t < g.numberOfInputs; t += 1) for (let e = 0; e < v[t]; e += 1) 0 === G[t][e].byteLength && (G[t][e] = new Float32Array(128));
              try {
                const t = U.map((t, e) => {
                  if (s[e].size > 0) return Y.set(e, C / 128), t;
                  const n = Y.get(e);
                  return undefined === n ? [] : (t.every(t => t.every(t => 0 === t)) && (1 === n ? Y.delete(e) : Y.set(e, n - 1)), t);
                }), i = l(d.currentTime + n / d.sampleRate, d.sampleRate, () => W.process(t, G, Q));
                Z = i;
                for (let t = 0, s = 0; t < g.numberOfOutputs; t += 1) {
                  for (let i = 0; i < v[t]; i += 1) dt(e, G[t], i, s + i, n);
                  s += v[t];
                }
              } catch (t) {
                Z = false, N.dispatchEvent(new ErrorEvent("processorerror", {colno: t.colno, filename: t.filename, lineno: t.lineno, message: t.message}));
              }
              if (!Z) {
                for (let t = 0; t < g.numberOfInputs; t += 1) {
                  T[t].disconnect(S[t]);
                  for (let e = 0; e < g.channelCount; e += 1) S[n].disconnect(A, e, t * g.channelCount + e);
                }
                if (undefined !== m.parameterDescriptors) {
                  const t = m.parameterDescriptors.length;
                  for (let e = 0; e < t; e += 1) {
                    const t = k[e];
                    t.disconnect(A, 0, y + e), t.stop();
                  }
                }
                A.disconnect(O), O.onaudioprocess = null, $ ? X() : K();
                break;
              }
            }
          }
        };
        let $ = false;
        const H = r(d, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0}), J = () => O.connect(H).connect(d.destination), K = () => {
          O.disconnect(H), H.disconnect();
        };
        return J(), p(N, () => {
          if (Z) {
            K(), g.numberOfOutputs > 0 && O.connect(D);
            for (let t = 0, e = 0; t < g.numberOfOutputs; t += 1) {
              const s = M[t];
              for (let n = 0; n < v[t]; n += 1) D.connect(s, e + n, n);
              e += v[t];
            }
          }
          $ = true;
        }, () => {
          Z && (J(), X()), $ = false;
        });
      })(_n, R, At, as, Lt, ds, Bt, Qt, Zt, gn, Ks, yn, os), wn = ((t, e, s, n, i) => (o, r, a, c, h, l) => {
        if (null !== a) try {
          const e = new a(o, c, l), n = new Map;
          let r = null;
          if (Object.defineProperties(e, {channelCount: {get: () => l.channelCount, set: () => {
            throw t();
          }}, channelCountMode: {get: () => "explicit", set: () => {
            throw t();
          }}, onprocessorerror: {get: () => r, set: t => {
            "function" == typeof r && e.removeEventListener("processorerror", r), r = "function" == typeof t ? t : null, "function" == typeof r && e.addEventListener("processorerror", r);
          }}}), e.addEventListener = (p = e.addEventListener, (...t) => {
            if ("processorerror" === t[0]) {
              const e = "function" == typeof t[1] ? t[1] : "object" == typeof t[1] && null !== t[1] && "function" == typeof t[1].handleEvent ? t[1].handleEvent : null;
              if (null !== e) {
                const s = n.get(t[1]);
                undefined !== s ? t[1] = s : (t[1] = s => {
                  "error" === s.type ? (Object.defineProperties(s, {type: {value: "processorerror"}}), e(s)) : e(new ErrorEvent(t[0], {...s}));
                }, n.set(e, t[1]));
              }
            }
            return p.call(e, "error", t[1], t[2]), p.call(e, ...t);
          }), e.removeEventListener = (u = e.removeEventListener, (...t) => {
            if ("processorerror" === t[0]) {
              const e = n.get(t[1]);
              undefined !== e && (n.delete(t[1]), t[1] = e);
            }
            return u.call(e, "error", t[1], t[2]), u.call(e, t[0], t[1], t[2]);
          }), 0 !== l.numberOfOutputs) {
            const t = s(o, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", gain: 0});
            return e.connect(t).connect(o.destination), i(e, () => t.disconnect(), () => t.connect(o.destination));
          }
          return e;
        } catch (t) {
          if (11 === t.code) throw n();
          throw t;
        }
        var u, p;
        if (undefined === h) throw n();
        return (t => {
          const {port1: e} = new MessageChannel;
          try {
            e.postMessage(t);
          } finally {
            e.close();
          }
        })(l), e(o, r, h, l);
      })(At, xn, Bt, Zt, os), bn = ((t, e, s, n, i, o, r, a, c, h, l, u, p, d, f, _) => (m, g, v) => {
        const y = new WeakMap;
        let x = null;
        return {render(w, b) {
          a(b, w);
          const T = y.get(b);
          return undefined !== T ? Promise.resolve(T) : (async (a, w) => {
            let b = l(a), T = null;
            const S = M(b, w), k = Array.isArray(g.outputChannelCount) ? g.outputChannelCount : Array.from(g.outputChannelCount);
            if (null === u) {
              const t = k.reduce((t, e) => t + e, 0), s = i(w, {channelCount: Math.max(1, t), channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: Math.max(1, t)}), o = [];
              for (let t = 0; t < a.numberOfOutputs; t += 1) o.push(n(w, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: k[t]}));
              const h = r(w, {channelCount: g.channelCount, channelCountMode: g.channelCountMode, channelInterpretation: g.channelInterpretation, gain: 1});
              h.connect = e.bind(null, o), h.disconnect = c.bind(null, o), T = [s, o, h];
            } else S || (b = new u(w, m));
            if (y.set(w, null === T ? b : T[2]), null !== T) {
              if (null === x) {
                if (undefined === v) throw new Error("Missing the processor constructor.");
                if (null === p) throw new Error("Missing the native OfflineAudioContext constructor.");
                const t = a.channelCount * a.numberOfInputs, e = undefined === v.parameterDescriptors ? 0 : v.parameterDescriptors.length, s = t + e, c = async () => {
                  const c = new p(s, 128 * Math.ceil(a.context.length / 128), w.sampleRate), h = [], l = [];
                  for (let t = 0; t < g.numberOfInputs; t += 1) h.push(r(c, {channelCount: g.channelCount, channelCountMode: g.channelCountMode, channelInterpretation: g.channelInterpretation, gain: 1})), l.push(i(c, {channelCount: g.channelCount, channelCountMode: "explicit", channelInterpretation: "discrete", numberOfOutputs: g.channelCount}));
                  const u = await Promise.all(Array.from(a.parameters.values()).map(async t => {
                    const e = o(c, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "discrete", offset: t.value});
                    return await d(c, t, e.offset), e;
                  })), m = n(c, {channelCount: 1, channelCountMode: "explicit", channelInterpretation: "speakers", numberOfInputs: Math.max(1, t + e)});
                  for (let t = 0; t < g.numberOfInputs; t += 1) {
                    h[t].connect(l[t]);
                    for (let e = 0; e < g.channelCount; e += 1) l[t].connect(m, e, t * g.channelCount + e);
                  }
                  for (const [e, s] of u.entries()) s.connect(m, 0, t + e), s.start(0);
                  return m.connect(c.destination), await Promise.all(h.map(t => f(a, c, t))), _(c);
                };
                x = _t(a, 0 === s ? null : await c(), w, g, k, v, h);
              }
              const t = await x, e = s(w, {buffer: null, channelCount: 2, channelCountMode: "max", channelInterpretation: "speakers", loop: false, loopEnd: 0, loopStart: 0, playbackRate: 1}), [c, l, u] = T;
              null !== t && (e.buffer = t, e.start(0)), e.connect(c);
              for (let t = 0, e = 0; t < a.numberOfOutputs; t += 1) {
                const s = l[t];
                for (let n = 0; n < k[t]; n += 1) c.connect(s, e + n, n);
                e += k[t];
              }
              return u;
            }
            if (S) for (const [e, s] of a.parameters.entries()) await t(w, s, b.parameters.get(e)); else for (const [t, e] of a.parameters.entries()) await d(w, e, b.parameters.get(t));
            return await f(a, w, b), b;
          })(w, b);
        }};
      })(Xe, _n, Ye, as, Lt, ds, Bt, mn, gn, Ks, tt, Fe, Ce, $e, Te, Cs), Tn = (t => e => t.get(e))(tn), Sn = (t => (e, s) => {
        t.set(e, s);
      })(vn), kn = Js ? ((t, e, s, n, i, o, r, a, c, h, l, u, p, d) => class extends e {
        constructor(e, l, p) {
          var d;
          const _ = a(e), m = c(_), g = (t => ({...t, outputChannelCount: undefined !== t.outputChannelCount ? t.outputChannelCount : 1 === t.numberOfInputs && 1 === t.numberOfOutputs ? [t.channelCount] : Array.from({length: t.numberOfOutputs}, () => 1)}))({...ut, ...p});
          (t => {
            const {port1: e, port2: s} = new MessageChannel;
            try {
              e.postMessage(t);
            } finally {
              e.close(), s.close();
            }
          })(g);
          const v = f.get(_), y = null == v ? undefined : v.get(l), x = m || "closed" !== _.state ? _ : null !== (d = r(_)) && undefined !== d ? d : _, w = i(x, m ? null : e.baseLatency, h, l, y, g);
          super(e, true, w, m ? n(l, g, y) : null);
          const b = [];
          w.parameters.forEach((t, e) => {
            const n = s(this, m, t);
            b.push([e, n]);
          }), this._nativeAudioWorkletNode = w, this._onprocessorerror = null, this._parameters = new lt(b), m && t(_, this);
          const {activeInputs: T} = o(this);
          u(w, T);
        }
        get onprocessorerror() {
          return this._onprocessorerror;
        }
        set onprocessorerror (t) {
          const e = "function" == typeof t ? d(this, t) : null;
          this._nativeAudioWorkletNode.onprocessorerror = e;
          const s = this._nativeAudioWorkletNode.onprocessorerror;
          this._onprocessorerror = null !== s && s === e ? t : s;
        }
        get parameters() {
          return null === this._parameters ? this._nativeAudioWorkletNode.parameters : this._parameters;
        }
        get port() {
          return this._nativeAudioWorkletNode.port;
        }
      })(fn, Ve, Je, bn, wn, j, Tn, ke, Oe, Fe, 0, Sn, 0, ue) : undefined, An = ((t, e) => (s, n, i) => {
        if (null === e) throw new Error("Missing the native OfflineAudioContext constructor.");
        try {
          return new e(s, n, i);
        } catch (e) {
          if ("SyntaxError" === e.name) throw t();
          throw e;
        }
      })(Zt, Ce), Cn = ((t, e, s, n, i, o, r, a) => (c, h) => s(c).render(c, h).then(() => Promise.all(Array.from(n(h)).map(t => s(t).render(t, h)))).then(() => i(h)).then(s => ("function" != typeof s.copyFromChannel ? (r(s), q(s)) : e(o, () => o(s)) || a(s), t.add(s), s)))(je, ge, be, dn, Cs, E, Be, Ue), On = ((t, e, s, n, i) => class extends t {
        constructor(t, s, i) {
          let o;
          if ("number" == typeof t && undefined !== s && undefined !== i) o = {length: s, numberOfChannels: t, sampleRate: i}; else {
            if ("object" != typeof t) throw new Error("The given parameters are not valid.");
            o = t;
          }
          const {length: r, numberOfChannels: a, sampleRate: c} = {...Xt, ...o}, h = n(a, r, c);
          e(Et, () => Et(h)) || h.addEventListener("statechange", (() => {
            let t = 0;
            const e = s => {
              "running" === this._state && (t > 0 ? (h.removeEventListener("statechange", e), s.stopImmediatePropagation(), this._waitForThePromiseToSettle(s)) : t += 1);
            };
            return e;
          })()), super(h, a), this._length = r, this._nativeOfflineAudioContext = h, this._state = null;
        }
        get length() {
          return undefined === this._nativeOfflineAudioContext.length ? this._length : this._nativeOfflineAudioContext.length;
        }
        get state() {
          return null === this._state ? this._nativeOfflineAudioContext.state : this._state;
        }
        startRendering() {
          return "running" === this._state ? Promise.reject(s()) : (this._state = "running", i(this.destination, this._nativeOfflineAudioContext).finally(() => {
            this._state = null, W(this);
          }));
        }
        _waitForThePromiseToSettle(t) {
          null === this._state ? this._nativeOfflineAudioContext.dispatchEvent(t) : setTimeout(() => this._waitForThePromiseToSettle(t));
        }
      })(rn, ge, At, An, Cn), Dn = ((t, e) => s => {
        const n = t.get(s);
        return e(n) || e(s);
      })(u, Re), Mn = ((t, e) => s => t.has(s) || e(s))(c, qe), En = ((t, e) => s => t.has(s) || e(s))(l, Ie), Rn = ((t, e) => s => {
        const n = t.get(s);
        return e(n) || e(s);
      })(u, Oe), qn = () => (async (t, e, s, n, i, o, r, a, c, h, l, u, p, d, f, _) => !!(t(e, e) && t(s, s) && t(i, i) && t(o, o) && t(a, a) && t(c, c) && t(h, h) && t(l, l) && t(u, u) && t(p, p) && t(d, d)) && (await Promise.all([t(n, n), t(r, r), t(f, f), t(_, _)])).every(t => t))(ge, (t => () => {
        if (null === t) return false;
        const e = new t(1, 1, 44100).createBuffer(1, 1, 44100);
        if (undefined === e.copyToChannel) return true;
        const s = new Float32Array(2);
        try {
          e.copyFromChannel(s, 0, 0);
        } catch {
          return false;
        }
        return true;
      })(Ce), (t => () => {
        if (null === t) return false;
        if (undefined !== t.prototype && undefined !== t.prototype.close) return true;
        const e = new t, s = undefined !== e.close;
        try {
          e.close();
        } catch {}
        return s;
      })(Ee), (t => () => {
        if (null === t) return Promise.resolve(false);
        const e = new t(1, 1, 44100);
        return new Promise(t => {
          let s = true;
          const n = n => {
            s && (s = false, e.startRendering(), t(n instanceof TypeError));
          };
          let i;
          try {
            i = e.decodeAudioData(null, () => {}, n);
          } catch (t) {
            n(t);
          }
          undefined !== i && i.catch(n);
        });
      })(Ce), (t => () => {
        if (null === t) return false;
        let e;
        try {
          e = new t({latencyHint: "balanced"});
        } catch {
          return false;
        }
        return e.close(), true;
      })(Ee), (t => () => {
        if (null === t) return false;
        const e = new t(1, 1, 44100).createGain(), s = e.connect(e) === e;
        return e.disconnect(e), s;
      })(Ce), ((t, e) => async () => {
        if (null === t) return true;
        if (null === e) return false;
        const s = new Blob(['let c,p;class A extends AudioWorkletProcessor{constructor(){super();this.port.onmessage=(e)=>{p=e.data;p.onmessage=()=>{p.postMessage(c);p.close()};this.port.postMessage(0)}}process(){c=1}}registerProcessor("a",A)'], {type: "application/javascript; charset=utf-8"}), n = new MessageChannel, i = new e(1, 128, 44100), o = URL.createObjectURL(s);
        let r = false;
        try {
          await i.audioWorklet.addModule(o);
          const e = new t(i, "a", {numberOfOutputs: 0}), s = i.createOscillator();
          await new Promise(t => {
            e.port.onmessage = () => t(), e.port.postMessage(n.port2, [n.port2]);
          }), e.port.onmessage = () => r = true, s.connect(e), s.start(0), await i.startRendering(), r = await new Promise(t => {
            n.port1.onmessage = ({data: e}) => t(1 === e), n.port1.postMessage(0);
          });
        } catch {} finally {
          n.port1.close(), URL.revokeObjectURL(o);
        }
        return r;
      })(Fe, Ce), (t => () => {
        if (null === t) return false;
        const e = new t(1, 1, 44100).createChannelMerger();
        if ("max" === e.channelCountMode) return true;
        try {
          e.channelCount = 2;
        } catch {
          return true;
        }
        return false;
      })(Ce), (t => () => {
        if (null === t) return false;
        const e = new t(1, 1, 44100);
        return undefined === e.createConstantSource || e.createConstantSource().offset.maxValue !== Number.POSITIVE_INFINITY;
      })(Ce), (t => () => {
        if (null === t) return false;
        const e = new t(1, 1, 44100), s = e.createConvolver();
        s.buffer = e.createBuffer(1, 1, e.sampleRate);
        try {
          s.buffer = e.createBuffer(1, 1, e.sampleRate);
        } catch {
          return false;
        }
        return true;
      })(Ce), (t => () => {
        if (null === t) return false;
        const e = new t(1, 1, 44100).createConvolver();
        try {
          e.channelCount = 1;
        } catch {
          return false;
        }
        return true;
      })(Ce), ce, (t => () => null !== t && t.hasOwnProperty("isSecureContext"))(xe), (t => () => {
        if (null === t) return false;
        const e = new t;
        try {
          return e.createMediaStreamSource(new MediaStream), false;
        } catch (t) {
          return true;
        } finally {
          e.close();
        }
      })(Ee), (t => () => {
        if (null === t) return Promise.resolve(false);
        const e = new t(1, 1, 44100);
        if (undefined === e.createStereoPanner) return Promise.resolve(true);
        if (undefined === e.createConstantSource) return Promise.resolve(true);
        const s = e.createConstantSource(), n = e.createStereoPanner();
        return s.channelCount = 1, s.offset.value = 1, n.channelCount = 1, s.start(), s.connect(n).connect(e.destination), e.startRendering().then(t => 1 !== t.getChannelData(0)[0]);
      })(Ce), he);
      function Bn(t, e) {
        if (!t) throw new Error(e);
      }
      function Un(t, e, s = Infinity) {
        if (!(e <= t && t <= s)) throw new RangeError(`Value must be within [${e}, ${s}], got: ${t}`);
      }
      function Gn(t) {
        t.isOffline || "running" === t.state || Kn('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.');
      }
      let Qn = false, Zn = false;
      function Xn(t) {
        Qn = t;
      }
      function Yn(t) {
        undefined === t && Qn && !Zn && (Zn = true, Kn("Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing"));
      }
      let $n = console;
      function Hn(t) {
        $n = t;
      }
      function Jn(...t) {
        $n.log(...t);
      }
      function Kn(...t) {
        $n.warn(...t);
      }
      const ti = "object" == typeof self ? self : null, ei = ti && (ti.hasOwnProperty("AudioContext") || ti.hasOwnProperty("webkitAudioContext"));
      function si(t, e, s, n) {
        var i, o = arguments.length, r = o < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, s) : n;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, s, n); else for (var a = t.length - 1; a >= 0; a--) (i = t[a]) && (r = (o < 3 ? i(r) : o > 3 ? i(e, s, r) : i(e, s)) || r);
        return o > 3 && r && Object.defineProperty(e, s, r), r;
      }
      function ni(t, e, s, n) {
        return new (s || (s = Promise))(function (i, o) {
          function r(t) {
            try {
              c(n.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              c(n.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function c(t) {
            var e;
            t.done ? i(t.value) : (e = t.value, e instanceof s ? e : new s(function (t) {
              t(e);
            })).then(r, a);
          }
          c((n = n.apply(t, e || [])).next());
        });
      }
      Object.create, Object.create, "function" == typeof SuppressedError && SuppressedError;
      class ii {
        constructor(t, e, s, n) {
          this._callback = t, this._type = e, this._minimumUpdateInterval = Math.max(128 / (n || 44100), 0.001), this.updateInterval = s, this._createClock();
        }
        _createWorker() {
          const t = new Blob([`\n\t\t\t// the initial timeout time\n\t\t\tlet timeoutTime =  ${(1e3 * this._updateInterval).toFixed(1)};\n\t\t\t// onmessage callback\n\t\t\tself.onmessage = function(msg){\n\t\t\t\ttimeoutTime = parseInt(msg.data);\n\t\t\t};\n\t\t\t// the tick function which posts a message\n\t\t\t// and schedules a new tick\n\t\t\tfunction tick(){\n\t\t\t\tsetTimeout(tick, timeoutTime);\n\t\t\t\tself.postMessage('tick');\n\t\t\t}\n\t\t\t// call tick initially\n\t\t\ttick();\n\t\t\t`], {type: "text/javascript"}), e = URL.createObjectURL(t), s = new Worker(e);
          s.onmessage = this._callback.bind(this), this._worker = s;
        }
        _createTimeout() {
          this._timeout = setTimeout(() => {
            this._createTimeout(), this._callback();
          }, 1e3 * this._updateInterval);
        }
        _createClock() {
          if ("worker" === this._type) try {
            this._createWorker();
          } catch (t) {
            this._type = "timeout", this._createClock();
          } else "timeout" === this._type && this._createTimeout();
        }
        _disposeClock() {
          this._timeout && clearTimeout(this._timeout), this._worker && (this._worker.terminate(), this._worker.onmessage = null);
        }
        get updateInterval() {
          return this._updateInterval;
        }
        set updateInterval (t) {
          var e;
          this._updateInterval = Math.max(t, this._minimumUpdateInterval), "worker" === this._type && (null === (e = this._worker) || undefined === e || e.postMessage(1e3 * this._updateInterval));
        }
        get type() {
          return this._type;
        }
        set type (t) {
          this._disposeClock(), this._type = t, this._createClock();
        }
        dispose() {
          this._disposeClock();
        }
      }
      function hi(t, e) {
        return "value" === t || En(e) || Mn(e) || function (t) {
          return t instanceof Ge;
        }(e);
      }
      function li(t, ...e) {
        if (!e.length) return t;
        const s = e.shift();
        if ("[object Object]" === Object.prototype.toString.call(t) && t.constructor === Object && ("[object Object]" === Object.prototype.toString.call(s) && s.constructor === Object)) for (const e in s) hi(e, s[e]) ? t[e] = s[e] : "[object Object]" === Object.prototype.toString.call(s[e]) && s[e].constructor === Object ? (t[e] || Object.assign(t, {[e]: {}}), li(t[e], s[e])) : Object.assign(t, {[e]: s[e]});
        return li(t, ...e);
      }
      function ui(t, e, s = [], n) {
        const i = {}, o = Array.from(e);
        if ("[object Object]" === Object.prototype.toString.call(o[0]) && o[0].constructor === Object && n && !Reflect.has(o[0], n) && (Object.keys(o[0]).some(e => Reflect.has(t, e)) || (li(i, {[n]: o[0]}), s.splice(s.indexOf(n), 1), o.shift())), 1 === o.length && ("[object Object]" === Object.prototype.toString.call(o[0]) && o[0].constructor === Object)) li(i, o[0]); else for (let t = 0; t < s.length; t++) undefined !== o[t] && (i[s[t]] = o[t]);
        return li(t, i);
      }
      function pi(t, e) {
        return undefined === t ? e : t;
      }
      function di(t, e) {
        return e.forEach(e => {
          Reflect.has(t, e) && delete t[e];
        }), t;
      }
      class fi {
        constructor() {
          this.debug = false, this._wasDisposed = false;
        }
        static getDefaults() {
          return {};
        }
        log(...t) {
          (this.debug || ti && this.toString() === ti.TONE_DEBUG_CLASS) && Jn(this, ...t);
        }
        dispose() {
          return this._wasDisposed = true, this;
        }
        get disposed() {
          return this._wasDisposed;
        }
        toString() {
          return this.name;
        }
      }
      fi.version = i;
      const _i = 0.000001;
      class wi extends fi {
        constructor() {
          super(), this.name = "Timeline", this._timeline = [];
          const t = ui(wi.getDefaults(), arguments, ["memory"]);
          this.memory = t.memory, this.increasing = t.increasing;
        }
        static getDefaults() {
          return {memory: Infinity, increasing: false};
        }
        get length() {
          return this._timeline.length;
        }
        add(t) {
          if (Bn(Reflect.has(t, "time"), "Timeline: events must have a time attribute"), t.time = t.time.valueOf(), this.increasing && this.length) {
            const e = this._timeline[this.length - 1];
            Bn(t.time > e.time + _i || Math.abs(t.time - e.time) < _i, "The time must be greater than or equal to the last scheduled time"), this._timeline.push(t);
          } else {
            const e = this._search(t.time);
            this._timeline.splice(e + 1, 0, t);
          }
          if (this.length > this.memory) {
            const t = this.length - this.memory;
            this._timeline.splice(0, t);
          }
          return this;
        }
        remove(t) {
          const e = this._timeline.indexOf(t);
          return -1 !== e && this._timeline.splice(e, 1), this;
        }
        get(t, e = "time") {
          const s = this._search(t, e);
          return -1 !== s ? this._timeline[s] : null;
        }
        peek() {
          return this._timeline[0];
        }
        shift() {
          return this._timeline.shift();
        }
        getAfter(t, e = "time") {
          const s = this._search(t, e);
          return s + 1 < this._timeline.length ? this._timeline[s + 1] : null;
        }
        getBefore(t) {
          const e = this._timeline.length;
          if (e > 0 && this._timeline[e - 1].time < t) return this._timeline[e - 1];
          const s = this._search(t);
          return s - 1 >= 0 ? this._timeline[s - 1] : null;
        }
        cancel(t) {
          if (this._timeline.length > 1) {
            let e = this._search(t);
            if (e >= 0) if (Math.abs(this._timeline[e].time - t) < _i) {
              for (let s = e; s >= 0 && Math.abs(this._timeline[s].time - t) < _i; s--) e = s;
              this._timeline = this._timeline.slice(0, e);
            } else this._timeline = this._timeline.slice(0, e + 1); else this._timeline = [];
          } else 1 === this._timeline.length && (this._timeline[0].time > t + _i || Math.abs(this._timeline[0].time - t) < _i) && (this._timeline = []);
          return this;
        }
        cancelBefore(t) {
          const e = this._search(t);
          return e >= 0 && (this._timeline = this._timeline.slice(e + 1)), this;
        }
        previousEvent(t) {
          const e = this._timeline.indexOf(t);
          return e > 0 ? this._timeline[e - 1] : null;
        }
        _search(t, e = "time") {
          if (0 === this._timeline.length) return -1;
          let s = 0;
          const n = this._timeline.length;
          let i = n;
          if (n > 0 && this._timeline[n - 1][e] <= t) return n - 1;
          for (; s < i;) {
            let n = Math.floor(s + (i - s) / 2);
            const o = this._timeline[n], r = this._timeline[n + 1];
            if (Math.abs(o[e] - t) < _i) {
              for (let s = n; s < this._timeline.length && Math.abs(this._timeline[s][e] - t) < _i; s++) n = s;
              return n;
            }
            if (o[e] + _i < t && r[e] > t + _i) return n;
            o[e] > t + _i ? i = n : s = n + 1;
          }
          return -1;
        }
        _iterate(t, e = 0, s = this._timeline.length - 1) {
          this._timeline.slice(e, s + 1).forEach(t);
        }
        forEach(t) {
          return this._iterate(t), this;
        }
        forEachBefore(t, e) {
          const s = this._search(t);
          return -1 !== s && this._iterate(e, 0, s), this;
        }
        forEachAfter(t, e) {
          const s = this._search(t);
          return this._iterate(e, s + 1), this;
        }
        forEachBetween(t, e, s) {
          let n = this._search(t), i = this._search(e);
          return -1 !== n && -1 !== i ? (this._timeline[n].time !== t && (n += 1), this._timeline[i].time === e && (i -= 1), this._iterate(s, n, i)) : -1 === n && this._iterate(s, 0, i), this;
        }
        forEachFrom(t, e) {
          let s = this._search(t);
          for (; s >= 0 && this._timeline[s].time >= t;) s--;
          return this._iterate(e, s + 1), this;
        }
        forEachAtTime(t, e) {
          const s = this._search(t);
          if (-1 !== s && Math.abs(this._timeline[s].time - t) < _i) {
            let n = s;
            for (let e = s; e >= 0 && Math.abs(this._timeline[e].time - t) < _i; e--) n = e;
            this._iterate(t => {
              e(t);
            }, n, s);
          }
          return this;
        }
        dispose() {
          return super.dispose(), this._timeline = [], this;
        }
      }
      const bi = [];
      function Ti(t) {
        bi.push(t);
      }
      const Si = [];
      function ki(t) {
        Si.push(t);
      }
      class Ai extends fi {
        constructor() {
          super(...arguments), this.name = "Emitter";
        }
        on(t, e) {
          return t.split(/\W+/).forEach(t => {
            undefined === this._events && (this._events = {}), this._events.hasOwnProperty(t) || (this._events[t] = []), this._events[t].push(e);
          }), this;
        }
        once(t, e) {
          const s = (...n) => {
            e(...n), this.off(t, s);
          };
          return this.on(t, s), this;
        }
        off(t, e) {
          return t.split(/\W+/).forEach(t => {
            if (undefined === this._events && (this._events = {}), this._events.hasOwnProperty(t)) if (undefined === e) this._events[t] = []; else {
              const s = this._events[t];
              for (let t = s.length - 1; t >= 0; t--) s[t] === e && s.splice(t, 1);
            }
          }), this;
        }
        emit(t, ...e) {
          if (this._events && this._events.hasOwnProperty(t)) {
            const s = this._events[t].slice(0);
            for (let t = 0, n = s.length; t < n; t++) s[t].apply(this, e);
          }
          return this;
        }
        static mixin(t) {
          ["on", "once", "off", "emit"].forEach(e => {
            const s = Object.getOwnPropertyDescriptor(Ai.prototype, e);
            Object.defineProperty(t.prototype, e, s);
          });
        }
        dispose() {
          return super.dispose(), this._events = undefined, this;
        }
      }
      class Ci extends Ai {
        constructor() {
          super(...arguments), this.isOffline = false;
        }
        toJSON() {
          return {};
        }
      }
      class Oi extends Ci {
        constructor() {
          var t, e;
          super(), this.name = "Context", this._constants = new Map, this._timeouts = new wi, this._timeoutIds = 0, this._initialized = false, this._closeStarted = false, this.isOffline = false, this._workletPromise = null;
          const s = ui(Oi.getDefaults(), arguments, ["context"]);
          s.context ? (this._context = s.context, this._latencyHint = (null === (t = arguments[0]) || undefined === t ? undefined : t.latencyHint) || "") : (this._context = function (t) {
            return new pn(t);
          }({latencyHint: s.latencyHint}), this._latencyHint = s.latencyHint), this._ticker = new ii(this.emit.bind(this, "tick"), s.clockSource, s.updateInterval, this._context.sampleRate), this.on("tick", this._timeoutLoop.bind(this)), this._context.onstatechange = () => {
            this.emit("statechange", this.state);
          }, this[(null === (e = arguments[0]) || undefined === e ? undefined : e.hasOwnProperty("updateInterval")) ? "_lookAhead" : "lookAhead"] = s.lookAhead;
        }
        static getDefaults() {
          return {clockSource: "worker", latencyHint: "interactive", lookAhead: 0.1, updateInterval: 0.05};
        }
        initialize() {
          var t;
          return this._initialized || (t = this, bi.forEach(e => e(t)), this._initialized = true), this;
        }
        createAnalyser() {
          return this._context.createAnalyser();
        }
        createOscillator() {
          return this._context.createOscillator();
        }
        createBufferSource() {
          return this._context.createBufferSource();
        }
        createBiquadFilter() {
          return this._context.createBiquadFilter();
        }
        createBuffer(t, e, s) {
          return this._context.createBuffer(t, e, s);
        }
        createChannelMerger(t) {
          return this._context.createChannelMerger(t);
        }
        createChannelSplitter(t) {
          return this._context.createChannelSplitter(t);
        }
        createConstantSource() {
          return this._context.createConstantSource();
        }
        createConvolver() {
          return this._context.createConvolver();
        }
        createDelay(t) {
          return this._context.createDelay(t);
        }
        createDynamicsCompressor() {
          return this._context.createDynamicsCompressor();
        }
        createGain() {
          return this._context.createGain();
        }
        createIIRFilter(t, e) {
          return this._context.createIIRFilter(t, e);
        }
        createPanner() {
          return this._context.createPanner();
        }
        createPeriodicWave(t, e, s) {
          return this._context.createPeriodicWave(t, e, s);
        }
        createStereoPanner() {
          return this._context.createStereoPanner();
        }
        createWaveShaper() {
          return this._context.createWaveShaper();
        }
        createMediaStreamSource(t) {
          return Bn(Dn(this._context), "Not available if OfflineAudioContext"), this._context.createMediaStreamSource(t);
        }
        createMediaElementSource(t) {
          return Bn(Dn(this._context), "Not available if OfflineAudioContext"), this._context.createMediaElementSource(t);
        }
        createMediaStreamDestination() {
          return Bn(Dn(this._context), "Not available if OfflineAudioContext"), this._context.createMediaStreamDestination();
        }
        decodeAudioData(t) {
          return this._context.decodeAudioData(t);
        }
        get currentTime() {
          return this._context.currentTime;
        }
        get state() {
          return this._context.state;
        }
        get sampleRate() {
          return this._context.sampleRate;
        }
        get listener() {
          return this.initialize(), this._listener;
        }
        set listener (t) {
          Bn(!this._initialized, "The listener cannot be set after initialization."), this._listener = t;
        }
        get transport() {
          return this.initialize(), this._transport;
        }
        set transport (t) {
          Bn(!this._initialized, "The transport cannot be set after initialization."), this._transport = t;
        }
        get draw() {
          return this.initialize(), this._draw;
        }
        set draw (t) {
          Bn(!this._initialized, "Draw cannot be set after initialization."), this._draw = t;
        }
        get destination() {
          return this.initialize(), this._destination;
        }
        set destination (t) {
          Bn(!this._initialized, "The destination cannot be set after initialization."), this._destination = t;
        }
        createAudioWorkletNode(t, e) {
          return function (t, e, s) {
            return Bn(undefined !== kn, "AudioWorkletNode only works in a secure context (https or localhost)"), new (t instanceof (null == ti ? undefined : ti.BaseAudioContext) ? null == ti ? undefined : ti.AudioWorkletNode : kn)(t, e, s);
          }(this.rawContext, t, e);
        }
        addAudioWorkletModule(t) {
          return ni(this, undefined, undefined, function* () {
            Bn(undefined !== this.rawContext.audioWorklet, "AudioWorkletNode is only available in a secure context (https or localhost)"), this._workletPromise || (this._workletPromise = this.rawContext.audioWorklet.addModule(t)), yield this._workletPromise;
          });
        }
        workletsAreReady() {
          return ni(this, undefined, undefined, function* () {
            (yield this._workletPromise) ? this._workletPromise : Promise.resolve();
          });
        }
        get updateInterval() {
          return this._ticker.updateInterval;
        }
        set updateInterval (t) {
          this._ticker.updateInterval = t;
        }
        get clockSource() {
          return this._ticker.type;
        }
        set clockSource (t) {
          this._ticker.type = t;
        }
        get lookAhead() {
          return this._lookAhead;
        }
        set lookAhead (t) {
          this._lookAhead = t, this.updateInterval = t ? t / 2 : 0.01;
        }
        get latencyHint() {
          return this._latencyHint;
        }
        get rawContext() {
          return this._context;
        }
        now() {
          return this._context.currentTime + this._lookAhead;
        }
        immediate() {
          return this._context.currentTime;
        }
        resume() {
          return Dn(this._context) ? this._context.resume() : Promise.resolve();
        }
        close() {
          return ni(this, undefined, undefined, function* () {
            var t;
            Dn(this._context) && "closed" !== this.state && !this._closeStarted && (this._closeStarted = true, yield this._context.close()), this._initialized && (t = this, Si.forEach(e => e(t)));
          });
        }
        getConstant(t) {
          if (this._constants.has(t)) return this._constants.get(t);
          {
            const e = this._context.createBuffer(1, 128, this._context.sampleRate), s = e.getChannelData(0);
            for (let e = 0; e < s.length; e++) s[e] = t;
            const n = this._context.createBufferSource();
            return n.channelCount = 1, n.channelCountMode = "explicit", n.buffer = e, n.loop = true, n.start(0), this._constants.set(t, n), n;
          }
        }
        dispose() {
          return super.dispose(), this._ticker.dispose(), this._timeouts.dispose(), Object.keys(this._constants).map(t => this._constants[t].disconnect()), this.close(), this;
        }
        _timeoutLoop() {
          const t = this.now();
          let e = this._timeouts.peek();
          for (; this._timeouts.length && e && e.time <= t;) e.callback(), this._timeouts.shift(), e = this._timeouts.peek();
        }
        setTimeout(t, e) {
          this._timeoutIds++;
          const s = this.now();
          return this._timeouts.add({callback: t, id: this._timeoutIds, time: s + e}), this._timeoutIds;
        }
        clearTimeout(t) {
          return this._timeouts.forEach(e => {
            e.id === t && this._timeouts.remove(e);
          }), this;
        }
        clearInterval(t) {
          return this.clearTimeout(t);
        }
        setInterval(t, e) {
          const s = ++this._timeoutIds, n = () => {
            const i = this.now();
            this._timeouts.add({callback: () => {
              t(), n();
            }, id: s, time: i + e});
          };
          return n(), s;
        }
      }
      function Di(t, e) {
        Array.isArray(e) ? e.forEach(e => Di(t, e)) : Object.defineProperty(t, e, {enumerable: true, writable: false});
      }
      function Mi(t, e) {
        Array.isArray(e) ? e.forEach(e => Mi(t, e)) : Object.defineProperty(t, e, {writable: true});
      }
      const Ei = () => {};
      class Ri extends fi {
        constructor() {
          super(), this.name = "ToneAudioBuffer", this.onload = Ei;
          const t = ui(Ri.getDefaults(), arguments, ["url", "onload", "onerror"]);
          this.reverse = t.reverse, this.onload = t.onload, "string" == typeof t.url ? this.load(t.url).catch(t.onerror) : t.url && this.set(t.url);
        }
        static getDefaults() {
          return {onerror: Ei, onload: Ei, reverse: false};
        }
        get sampleRate() {
          return this._buffer ? this._buffer.sampleRate : (Fi === Ii && ei && Ni(new Oi), Fi).sampleRate;
        }
        set(t) {
          return t instanceof Ri ? t.loaded ? this._buffer = t.get() : t.onload = () => {
            this.set(t), this.onload(this);
          } : this._buffer = t, this._reversed && this._reverse(), this;
        }
        get() {
          return this._buffer;
        }
        load(t) {
          return ni(this, undefined, undefined, function* () {
            const e = Ri.load(t).then(t => {
              this.set(t), this.onload(this);
            });
            Ri.downloads.push(e);
            try {
              yield e;
            } finally {
              const t = Ri.downloads.indexOf(e);
              Ri.downloads.splice(t, 1);
            }
            return this;
          });
        }
        dispose() {
          return super.dispose(), this._buffer = undefined, this;
        }
        fromArray(t) {
          const e = Array.isArray(t) && t[0].length > 0, s = e ? t.length : 1, n = e ? t[0].length : t.length, i = (Fi === Ii && ei && Ni(new Oi), Fi), o = i.createBuffer(s, n, i.sampleRate), r = e || 1 !== s ? t : [t];
          for (let t = 0; t < s; t++) o.copyToChannel(r[t], t);
          return this._buffer = o, this;
        }
        toMono(t) {
          if ("number" == typeof t) this.fromArray(this.toArray(t)); else {
            let t = new Float32Array(this.length);
            const e = this.numberOfChannels;
            for (let s = 0; s < e; s++) {
              const e = this.toArray(s);
              for (let s = 0; s < e.length; s++) t[s] += e[s];
            }
            t = t.map(t => t / e), this.fromArray(t);
          }
          return this;
        }
        toArray(t) {
          if ("number" == typeof t) return this.getChannelData(t);
          if (1 === this.numberOfChannels) return this.toArray(0);
          {
            const t = [];
            for (let e = 0; e < this.numberOfChannels; e++) t[e] = this.getChannelData(e);
            return t;
          }
        }
        getChannelData(t) {
          return this._buffer ? this._buffer.getChannelData(t) : new Float32Array(0);
        }
        slice(t, e = this.duration) {
          Bn(this.loaded, "Buffer is not loaded");
          const s = Math.floor(t * this.sampleRate), n = Math.floor(e * this.sampleRate);
          Bn(s < n, "The start time must be less than the end time");
          const i = n - s, o = (Fi === Ii && ei && Ni(new Oi), Fi).createBuffer(this.numberOfChannels, i, this.sampleRate);
          for (let t = 0; t < this.numberOfChannels; t++) o.copyToChannel(this.getChannelData(t).subarray(s, n), t);
          return new Ri(o);
        }
        _reverse() {
          if (this.loaded) for (let t = 0; t < this.numberOfChannels; t++) this.getChannelData(t).reverse();
          return this;
        }
        get loaded() {
          return this.length > 0;
        }
        get duration() {
          return this._buffer ? this._buffer.duration : 0;
        }
        get length() {
          return this._buffer ? this._buffer.length : 0;
        }
        get numberOfChannels() {
          return this._buffer ? this._buffer.numberOfChannels : 0;
        }
        get reverse() {
          return this._reversed;
        }
        set reverse (t) {
          this._reversed !== t && (this._reversed = t, this._reverse());
        }
        static fromArray(t) {
          return (new Ri).fromArray(t);
        }
        static fromUrl(t) {
          return ni(this, undefined, undefined, function* () {
            const e = new Ri;
            return yield e.load(t);
          });
        }
        static load(t) {
          return ni(this, undefined, undefined, function* () {
            const e = t.match(/\[([^\]\[]+\|.+)\]$/);
            if (e) {
              const s = e[1].split("|");
              let n = s[0];
              for (const t of s) if (Ri.supportsType(t)) {
                n = t;
                break;
              }
              t = t.replace(e[0], n);
            }
            const s = "" === Ri.baseUrl || Ri.baseUrl.endsWith("/") ? Ri.baseUrl : Ri.baseUrl + "/", n = document.createElement("a");
            n.href = s + t, n.pathname = (n.pathname + n.hash).split("/").map(encodeURIComponent).join("/");
            const i = yield fetch(n.href);
            if (!i.ok) throw new Error(`could not load url: ${t}`);
            const o = yield i.arrayBuffer();
            return yield (Fi === Ii && ei && Ni(new Oi), Fi).decodeAudioData(o);
          });
        }
        static supportsType(t) {
          const e = t.split("."), s = e[e.length - 1];
          return "" !== document.createElement("audio").canPlayType("audio/" + s);
        }
        static loaded() {
          return ni(this, undefined, undefined, function* () {
            for (yield Promise.resolve(); Ri.downloads.length;) yield Ri.downloads[0];
          });
        }
      }
      Ri.baseUrl = "", Ri.downloads = [];
      class qi extends Oi {
        constructor() {
          var t, e, s;
          super({clockSource: "offline", context: Rn(arguments[0]) ? arguments[0] : (t = arguments[0], e = arguments[1] * arguments[2], s = arguments[2], new On(t, e, s)), lookAhead: 0, updateInterval: Rn(arguments[0]) ? 128 / arguments[0].sampleRate : 128 / arguments[2]}), this.name = "OfflineContext", this._currentTime = 0, this.isOffline = true, this._duration = Rn(arguments[0]) ? arguments[0].length / arguments[0].sampleRate : arguments[1];
        }
        now() {
          return this._currentTime;
        }
        get currentTime() {
          return this._currentTime;
        }
        _renderClock(t) {
          return ni(this, undefined, undefined, function* () {
            let e = 0;
            for (; this._duration - this._currentTime >= 0;) {
              this.emit("tick"), this._currentTime += 128 / this.sampleRate, e++;
              const s = Math.floor(this.sampleRate / 128);
              t && e % s == 0 && (yield new Promise(t => setTimeout(t, 1)));
            }
          });
        }
        render() {
          return ni(this, arguments, undefined, function* (t = true) {
            yield this.workletsAreReady(), yield this._renderClock(t);
            const e = yield this._context.startRendering();
            return new Ri(e);
          });
        }
        close() {
          return Promise.resolve();
        }
      }
      const Ii = new class extends Ci {
        constructor() {
          super(...arguments), this.lookAhead = 0, this.latencyHint = 0, this.isOffline = false;
        }
        createAnalyser() {
          return {};
        }
        createOscillator() {
          return {};
        }
        createBufferSource() {
          return {};
        }
        createBiquadFilter() {
          return {};
        }
        createBuffer(t, e, s) {
          return {};
        }
        createChannelMerger(t) {
          return {};
        }
        createChannelSplitter(t) {
          return {};
        }
        createConstantSource() {
          return {};
        }
        createConvolver() {
          return {};
        }
        createDelay(t) {
          return {};
        }
        createDynamicsCompressor() {
          return {};
        }
        createGain() {
          return {};
        }
        createIIRFilter(t, e) {
          return {};
        }
        createPanner() {
          return {};
        }
        createPeriodicWave(t, e, s) {
          return {};
        }
        createStereoPanner() {
          return {};
        }
        createWaveShaper() {
          return {};
        }
        createMediaStreamSource(t) {
          return {};
        }
        createMediaElementSource(t) {
          return {};
        }
        createMediaStreamDestination() {
          return {};
        }
        decodeAudioData(t) {
          return Promise.resolve({});
        }
        createAudioWorkletNode(t, e) {
          return {};
        }
        get rawContext() {
          return {};
        }
        addAudioWorkletModule(t) {
          return ni(this, undefined, undefined, function* () {
            return Promise.resolve();
          });
        }
        resume() {
          return Promise.resolve();
        }
        setTimeout(t, e) {
          return 0;
        }
        clearTimeout(t) {
          return this;
        }
        setInterval(t, e) {
          return 0;
        }
        clearInterval(t) {
          return this;
        }
        getConstant(t) {
          return {};
        }
        get currentTime() {
          return 0;
        }
        get state() {
          return {};
        }
        get sampleRate() {
          return 0;
        }
        get listener() {
          return {};
        }
        get transport() {
          return {};
        }
        get draw() {
          return {};
        }
        set draw (t) {}
        get destination() {
          return {};
        }
        set destination (t) {}
        now() {
          return 0;
        }
        immediate() {
          return 0;
        }
      };
      let Fi = Ii;
      function Ni(t, e = false) {
        e && Fi.dispose(), Fi = Dn(t) ? new Oi(t) : Rn(t) ? new qi(t) : t;
      }
      if (ti && !ti.TONE_SILENCE_LOGGING) {
        let t = "v";
        "dev" === i && (t = "");
        const e = ` * Tone.js ${t}${i} * `;
        console.log(`%c${e}`, "background: #000; color: #fff");
      }
      let Wi = 440;
      class Qi extends fi {
        constructor(t, e, s) {
          super(), this.defaultUnits = "s", this._val = e, this._units = s, this.context = t, this._expressions = this._getExpressions();
        }
        _getExpressions() {
          return {hz: {method: t => this._frequencyToUnits(parseFloat(t)), regexp: /^(\d+(?:\.\d+)?)hz$/i}, i: {method: t => this._ticksToUnits(parseInt(t, 10)), regexp: /^(\d+)i$/i}, m: {method: t => this._beatsToUnits(parseInt(t, 10) * this._getTimeSignature()), regexp: /^(\d+)m$/i}, n: {method: (t, e) => {
            const s = parseInt(t, 10), n = "." === e ? 1.5 : 1;
            return 1 === s ? this._beatsToUnits(this._getTimeSignature()) * n : this._beatsToUnits(4 / s) * n;
          }, regexp: /^(\d+)n(\.?)$/i}, number: {method: t => this._expressions[this.defaultUnits].method.call(this, t), regexp: /^(\d+(?:\.\d+)?)$/}, s: {method: t => this._secondsToUnits(parseFloat(t)), regexp: /^(\d+(?:\.\d+)?)s$/}, samples: {method: t => parseInt(t, 10) / this.context.sampleRate, regexp: /^(\d+)samples$/}, t: {method: t => {
            const e = parseInt(t, 10);
            return this._beatsToUnits(8 / (3 * Math.floor(e)));
          }, regexp: /^(\d+)t$/i}, tr: {method: (t, e, s) => {
            let n = 0;
            return t && "0" !== t && (n += this._beatsToUnits(this._getTimeSignature() * parseFloat(t))), e && "0" !== e && (n += this._beatsToUnits(parseFloat(e))), s && "0" !== s && (n += this._beatsToUnits(parseFloat(s) / 4)), n;
          }, regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/}};
        }
        valueOf() {
          if (this._val instanceof Qi && this.fromType(this._val), undefined === this._val) return this._noArg();
          if ("string" == typeof this._val && undefined === this._units) {
            for (const t in this._expressions) if (this._expressions[t].regexp.test(this._val.trim())) {
              this._units = t;
              break;
            }
          } else if ("[object Object]" === Object.prototype.toString.call(this._val) && this._val.constructor === Object) {
            let t = 0;
            for (const e in this._val) if (undefined !== this._val[e]) {
              const s = this._val[e];
              t += new this.constructor(this.context, e).valueOf() * s;
            }
            return t;
          }
          if (undefined !== this._units) {
            const t = this._expressions[this._units], e = this._val.toString().trim().match(t.regexp);
            return e ? t.method.apply(this, e.slice(1)) : t.method.call(this, this._val);
          }
          return "string" == typeof this._val ? parseFloat(this._val) : this._val;
        }
        _frequencyToUnits(t) {
          return 1 / t;
        }
        _beatsToUnits(t) {
          return 60 / this._getBpm() * t;
        }
        _secondsToUnits(t) {
          return t;
        }
        _ticksToUnits(t) {
          return t * this._beatsToUnits(1) / this._getPPQ();
        }
        _noArg() {
          return this._now();
        }
        _getBpm() {
          return this.context.transport.bpm.value;
        }
        _getTimeSignature() {
          return this.context.transport.timeSignature;
        }
        _getPPQ() {
          return this.context.transport.PPQ;
        }
        fromType(t) {
          switch (this._units = undefined, this.defaultUnits) {
            case "s":
              this._val = t.toSeconds();
              break;
            case "i":
              this._val = t.toTicks();
              break;
            case "hz":
              this._val = t.toFrequency();
              break;
            case "midi":
              this._val = t.toMidi();
          }
          return this;
        }
        toFrequency() {
          return 1 / this.toSeconds();
        }
        toSamples() {
          return this.toSeconds() * this.context.sampleRate;
        }
        toMilliseconds() {
          return 1e3 * this.toSeconds();
        }
      }
      class Zi extends Qi {
        constructor() {
          super(...arguments), this.name = "TimeClass";
        }
        _getExpressions() {
          return Object.assign(super._getExpressions(), {now: {method: t => this._now() + new this.constructor(this.context, t).valueOf(), regexp: /^\+(.+)/}, quantize: {method: t => {
            const e = new Zi(this.context, t).valueOf();
            return this._secondsToUnits(this.context.transport.nextSubdivision(e));
          }, regexp: /^@(.+)/}});
        }
        quantize(t, e = 1) {
          const s = new this.constructor(this.context, t).valueOf(), n = this.valueOf();
          return n + (Math.round(n / s) * s - n) * e;
        }
        toNotation() {
          const t = this.toSeconds(), e = ["1m"];
          for (let t = 1; t < 9; t++) {
            const s = Math.pow(2, t);
            e.push(s + "n."), e.push(s + "n"), e.push(s + "t");
          }
          e.push("0");
          let s = "1m", n = new Zi(this.context, "1m").toSeconds();
          return e.forEach(e => {
            const i = new Zi(this.context, e).toSeconds();
            Math.abs(i - t) < Math.abs(n - t) && (s = e, n = i);
          }), s;
        }
        toBarsBeatsSixteenths() {
          const t = this._beatsToUnits(1);
          let e = this.valueOf() / t;
          e = parseFloat(e.toFixed(4));
          const s = Math.floor(e / this._getTimeSignature());
          let n = e % 1 * 4;
          e = Math.floor(e) % this._getTimeSignature();
          const i = n.toString();
          return i.length > 3 && (n = parseFloat(parseFloat(i).toFixed(3))), [s, e, n].join(":");
        }
        toTicks() {
          const t = this._beatsToUnits(1);
          return this.valueOf() / t * this._getPPQ();
        }
        toSeconds() {
          return this.valueOf();
        }
        toMidi() {
          return Math.round(69 + 12 * Math.log2(this.toFrequency() / Wi));
        }
        _now() {
          return this.context.now();
        }
      }
      function Xi(t, e) {
        return new Zi((Fi === Ii && ei && Ni(new Oi), Fi), t, e);
      }
      class Yi extends Zi {
        constructor() {
          super(...arguments), this.name = "Frequency", this.defaultUnits = "hz";
        }
        static get A4() {
          return Wi;
        }
        static set A4 (t) {
          !function (t) {
            Wi = t;
          }(t);
        }
        _getExpressions() {
          return Object.assign({}, super._getExpressions(), {midi: {regexp: /^(\d+(?:\.\d+)?midi)/, method(t) {
            return "midi" === this.defaultUnits ? t : Yi.mtof(t);
          }}, note: {regexp: /^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i, method(t, e) {
            const s = $i[t.toLowerCase()] + 12 * (parseInt(e, 10) + 1);
            return "midi" === this.defaultUnits ? s : Yi.mtof(s);
          }}, tr: {regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/, method(t, e, s) {
            let n = 1;
            return t && "0" !== t && (n *= this._beatsToUnits(this._getTimeSignature() * parseFloat(t))), e && "0" !== e && (n *= this._beatsToUnits(parseFloat(e))), s && "0" !== s && (n *= this._beatsToUnits(parseFloat(s) / 4)), n;
          }}});
        }
        transpose(t) {
          return new Yi(this.context, this.valueOf() * Math.pow(2, t / 12));
        }
        harmonize(t) {
          return t.map(t => this.transpose(t));
        }
        toMidi() {
          return Math.round(69 + 12 * Math.log2(this.valueOf() / Wi));
        }
        toNote() {
          const t = this.toFrequency(), e = Math.log2(t / Yi.A4);
          let s = Math.round(12 * e) + 57;
          const n = Math.floor(s / 12);
          return n < 0 && (s += -12 * n), Hi[s % 12] + n.toString();
        }
        toSeconds() {
          return 1 / super.toSeconds();
        }
        toTicks() {
          const t = this._beatsToUnits(1), e = this.valueOf() / t;
          return Math.floor(e * this._getPPQ());
        }
        _noArg() {
          return 0;
        }
        _frequencyToUnits(t) {
          return t;
        }
        _ticksToUnits(t) {
          return 1 / (60 * t / (this._getBpm() * this._getPPQ()));
        }
        _beatsToUnits(t) {
          return 1 / super._beatsToUnits(t);
        }
        _secondsToUnits(t) {
          return 1 / t;
        }
        static mtof(t) {
          return Wi * Math.pow(2, (t - 69) / 12);
        }
        static ftom(t) {
          return Math.round(69 + 12 * Math.log2(t / Wi));
        }
      }
      const $i = {cbbb: -3, cbb: -2, cb: -1, c: 0, "c#": 1, cx: 2, "c##": 2, "c###": 3, "cx#": 3, "c#x": 3, dbbb: -1, dbb: 0, db: 1, d: 2, "d#": 3, dx: 4, "d##": 4, "d###": 5, "dx#": 5, "d#x": 5, ebbb: 1, ebb: 2, eb: 3, e: 4, "e#": 5, ex: 6, "e##": 6, "e###": 7, "ex#": 7, "e#x": 7, fbbb: 2, fbb: 3, fb: 4, f: 5, "f#": 6, fx: 7, "f##": 7, "f###": 8, "fx#": 8, "f#x": 8, gbbb: 4, gbb: 5, gb: 6, g: 7, "g#": 8, gx: 9, "g##": 9, "g###": 10, "gx#": 10, "g#x": 10, abbb: 6, abb: 7, ab: 8, a: 9, "a#": 10, ax: 11, "a##": 11, "a###": 12, "ax#": 12, "a#x": 12, bbbb: 8, bbb: 9, bb: 10, b: 11, "b#": 12, bx: 13, "b##": 13, "b###": 14, "bx#": 14, "b#x": 14}, Hi = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      function Ji(t, e) {
        return new Yi((Fi === Ii && ei && Ni(new Oi), Fi), t, e);
      }
      class Ki extends Zi {
        constructor() {
          super(...arguments), this.name = "TransportTime";
        }
        _now() {
          return this.context.transport.seconds;
        }
      }
      function to(t, e) {
        return new Ki((Fi === Ii && ei && Ni(new Oi), Fi), t, e);
      }
      class eo extends fi {
        constructor() {
          super();
          const t = ui(eo.getDefaults(), arguments, ["context"]);
          this.defaultContext ? this.context = this.defaultContext : this.context = t.context;
        }
        static getDefaults() {
          return {context: (Fi === Ii && ei && Ni(new Oi), Fi)};
        }
        now() {
          return this.context.currentTime + this.context.lookAhead;
        }
        immediate() {
          return this.context.currentTime;
        }
        get sampleTime() {
          return 1 / this.context.sampleRate;
        }
        get blockTime() {
          return 128 / this.context.sampleRate;
        }
        toSeconds(t) {
          return Yn(t), new Zi(this.context, t).toSeconds();
        }
        toFrequency(t) {
          return new Yi(this.context, t).toFrequency();
        }
        toTicks(t) {
          return new Ki(this.context, t).toTicks();
        }
        _getPartialProperties(t) {
          const e = this.get();
          return Object.keys(e).forEach(s => {
            undefined === t[s] && delete e[s];
          }), e;
        }
        get() {
          const t = this.constructor.getDefaults();
          return Object.keys(t).forEach(e => {
            if (Reflect.has(this, e)) {
              const s = this[e];
              undefined !== s && undefined !== s.value && undefined !== s.setValueAtTime ? t[e] = s.value : s instanceof eo ? t[e] = s._getPartialProperties(t[e]) : Array.isArray(s) || "number" == typeof s || "string" == typeof s || "boolean" == typeof s ? t[e] = s : delete t[e];
            }
          }), t;
        }
        set(t) {
          return Object.keys(t).forEach(e => {
            Reflect.has(this, e) && undefined !== this[e] && (this[e] && undefined !== this[e].value && undefined !== this[e].setValueAtTime ? this[e].value !== t[e] && (this[e].value = t[e]) : this[e] instanceof eo ? this[e].set(t[e]) : this[e] = t[e]);
          }), this;
        }
      }
      class so extends wi {
        constructor(t = "stopped") {
          super(), this.name = "StateTimeline", this._initial = t, this.setStateAtTime(this._initial, 0);
        }
        getValueAtTime(t) {
          const e = this.get(t);
          return null !== e ? e.state : this._initial;
        }
        setStateAtTime(t, e, s) {
          return Un(e, 0), this.add(Object.assign({}, s, {state: t, time: e})), this;
        }
        getLastState(t, e) {
          for (let s = this._search(e); s >= 0; s--) {
            const e = this._timeline[s];
            if (e.state === t) return e;
          }
        }
        getNextState(t, e) {
          const s = this._search(e);
          if (-1 !== s) for (let e = s; e < this._timeline.length; e++) {
            const s = this._timeline[e];
            if (s.state === t) return s;
          }
        }
      }
      class no extends eo {
        constructor() {
          const t = ui(no.getDefaults(), arguments, ["param", "units", "convert"]);
          for (super(t), this.name = "Param", this.overridden = false, this._minOutput = 1e-7, Bn(undefined !== t.param && (En(t.param) || t.param instanceof no), "param must be an AudioParam"); !En(t.param);) t.param = t.param._param;
          this._swappable = !!(undefined !== t.swappable) && t.swappable, this._swappable ? (this.input = this.context.createGain(), this._param = t.param, this.input.connect(this._param)) : this._param = this.input = t.param, this._events = new wi(1e3), this._initialValue = this._param.defaultValue, this.units = t.units, this.convert = t.convert, this._minValue = t.minValue, this._maxValue = t.maxValue, undefined !== t.value && t.value !== this._toType(this._initialValue) && this.setValueAtTime(t.value, 0);
        }
        static getDefaults() {
          return Object.assign(eo.getDefaults(), {convert: true, units: "number"});
        }
        get value() {
          const t = this.now();
          return this.getValueAtTime(t);
        }
        set value (t) {
          this.cancelScheduledValues(this.now()), this.setValueAtTime(t, this.now());
        }
        get minValue() {
          return undefined !== this._minValue ? this._minValue : "time" === this.units || "frequency" === this.units || "normalRange" === this.units || "positive" === this.units || "transportTime" === this.units || "ticks" === this.units || "bpm" === this.units || "hertz" === this.units || "samples" === this.units ? 0 : "audioRange" === this.units ? -1 : "decibels" === this.units ? -Infinity : this._param.minValue;
        }
        get maxValue() {
          return undefined !== this._maxValue ? this._maxValue : "normalRange" === this.units || "audioRange" === this.units ? 1 : this._param.maxValue;
        }
        _is(t, e) {
          return this.units === e;
        }
        _assertRange(t) {
          return undefined !== this.maxValue && undefined !== this.minValue && Un(t, this._fromType(this.minValue), this._fromType(this.maxValue)), t;
        }
        _fromType(t) {
          return this.convert && !this.overridden ? this._is(t, "time") ? this.toSeconds(t) : this._is(t, "decibels") ? Math.pow(10, t / 20) : this._is(t, "frequency") ? this.toFrequency(t) : t : this.overridden ? 0 : t;
        }
        _toType(t) {
          return this.convert && "decibels" === this.units ? Math.log(t) / Math.LN10 * 20 : t;
        }
        setValueAtTime(t, e) {
          const s = this.toSeconds(e), n = this._fromType(t);
          return Bn(isFinite(n) && isFinite(s), `Invalid argument(s) to setValueAtTime: ${JSON.stringify(t)}, ${JSON.stringify(e)}`), this._assertRange(n), this.log(this.units, "setValueAtTime", t, s), this._events.add({time: s, type: "setValueAtTime", value: n}), this._param.setValueAtTime(n, s), this;
        }
        getValueAtTime(t) {
          const e = Math.max(this.toSeconds(t), 0), s = this._events.getAfter(e), n = this._events.get(e);
          let i = this._initialValue;
          if (null === n) i = this._initialValue; else if ("setTargetAtTime" !== n.type || null !== s && "setValueAtTime" !== s.type) if (null === s) i = n.value; else if ("linearRampToValueAtTime" === s.type || "exponentialRampToValueAtTime" === s.type) {
            let t = n.value;
            if ("setTargetAtTime" === n.type) {
              const e = this._events.getBefore(n.time);
              t = null === e ? this._initialValue : e.value;
            }
            i = "linearRampToValueAtTime" === s.type ? this._linearInterpolate(n.time, t, s.time, s.value, e) : this._exponentialInterpolate(n.time, t, s.time, s.value, e);
          } else i = n.value; else {
            const t = this._events.getBefore(n.time);
            let s;
            s = null === t ? this._initialValue : t.value, "setTargetAtTime" === n.type && (i = this._exponentialApproach(n.time, s, n.value, n.constant, e));
          }
          return this._toType(i);
        }
        setRampPoint(t) {
          t = this.toSeconds(t);
          let e = this.getValueAtTime(t);
          return this.cancelAndHoldAtTime(t), 0 === this._fromType(e) && (e = this._toType(this._minOutput)), this.setValueAtTime(e, t), this;
        }
        linearRampToValueAtTime(t, e) {
          const s = this._fromType(t), n = this.toSeconds(e);
          return Bn(isFinite(s) && isFinite(n), `Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(t)}, ${JSON.stringify(e)}`), this._assertRange(s), this._events.add({time: n, type: "linearRampToValueAtTime", value: s}), this.log(this.units, "linearRampToValueAtTime", t, n), this._param.linearRampToValueAtTime(s, n), this;
        }
        exponentialRampToValueAtTime(t, e) {
          let s = this._fromType(t);
          s = Math.abs(s - 0) < _i ? this._minOutput : s, this._assertRange(s);
          const n = this.toSeconds(e);
          return Bn(isFinite(s) && isFinite(n), `Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(t)}, ${JSON.stringify(e)}`), this._events.add({time: n, type: "exponentialRampToValueAtTime", value: s}), this.log(this.units, "exponentialRampToValueAtTime", t, n), this._param.exponentialRampToValueAtTime(s, n), this;
        }
        exponentialRampTo(t, e, s) {
          return s = this.toSeconds(s), this.setRampPoint(s), this.exponentialRampToValueAtTime(t, s + this.toSeconds(e)), this;
        }
        linearRampTo(t, e, s) {
          return s = this.toSeconds(s), this.setRampPoint(s), this.linearRampToValueAtTime(t, s + this.toSeconds(e)), this;
        }
        targetRampTo(t, e, s) {
          return s = this.toSeconds(s), this.setRampPoint(s), this.exponentialApproachValueAtTime(t, s, e), this;
        }
        exponentialApproachValueAtTime(t, e, s) {
          e = this.toSeconds(e), s = this.toSeconds(s);
          const n = Math.log(s + 1) / Math.log(200);
          return this.setTargetAtTime(t, e, n), this.cancelAndHoldAtTime(e + 0.9 * s), this.linearRampToValueAtTime(t, e + s), this;
        }
        setTargetAtTime(t, e, s) {
          const n = this._fromType(t);
          Bn(isFinite(s) && s > 0, "timeConstant must be a number greater than 0");
          const i = this.toSeconds(e);
          return this._assertRange(n), Bn(isFinite(n) && isFinite(i), `Invalid argument(s) to setTargetAtTime: ${JSON.stringify(t)}, ${JSON.stringify(e)}`), this._events.add({constant: s, time: i, type: "setTargetAtTime", value: n}), this.log(this.units, "setTargetAtTime", t, i, s), this._param.setTargetAtTime(n, i, s), this;
        }
        setValueCurveAtTime(t, e, s, n = 1) {
          s = this.toSeconds(s), e = this.toSeconds(e);
          const i = this._fromType(t[0]) * n;
          this.setValueAtTime(this._toType(i), e);
          const o = s / (t.length - 1);
          for (let s = 1; s < t.length; s++) {
            const i = this._fromType(t[s]) * n;
            this.linearRampToValueAtTime(this._toType(i), e + s * o);
          }
          return this;
        }
        cancelScheduledValues(t) {
          const e = this.toSeconds(t);
          return Bn(isFinite(e), `Invalid argument to cancelScheduledValues: ${JSON.stringify(t)}`), this._events.cancel(e), this._param.cancelScheduledValues(e), this.log(this.units, "cancelScheduledValues", e), this;
        }
        cancelAndHoldAtTime(t) {
          const e = this.toSeconds(t), s = this._fromType(this.getValueAtTime(e));
          Bn(isFinite(e), `Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(t)}`), this.log(this.units, "cancelAndHoldAtTime", e, "value=" + s);
          const n = this._events.get(e), i = this._events.getAfter(e);
          return n && Math.abs(n.time - e) < _i ? i ? (this._param.cancelScheduledValues(i.time), this._events.cancel(i.time)) : (this._param.cancelAndHoldAtTime(e), this._events.cancel(e + this.sampleTime)) : i && (this._param.cancelScheduledValues(i.time), this._events.cancel(i.time), "linearRampToValueAtTime" === i.type ? this.linearRampToValueAtTime(this._toType(s), e) : "exponentialRampToValueAtTime" === i.type && this.exponentialRampToValueAtTime(this._toType(s), e)), this._events.add({time: e, type: "setValueAtTime", value: s}), this._param.setValueAtTime(s, e), this;
        }
        rampTo(t, e = 0.1, s) {
          return "frequency" === this.units || "bpm" === this.units || "decibels" === this.units ? this.exponentialRampTo(t, e, s) : this.linearRampTo(t, e, s), this;
        }
        apply(t) {
          const e = this.context.currentTime;
          t.setValueAtTime(this.getValueAtTime(e), e);
          const s = this._events.get(e);
          if (s && "setTargetAtTime" === s.type) {
            const n = this._events.getAfter(s.time), i = n ? n.time : e + 2, o = (i - e) / 10;
            for (let s = e; s < i; s += o) t.linearRampToValueAtTime(this.getValueAtTime(s), s);
          }
          return this._events.forEachAfter(this.context.currentTime, e => {
            "cancelScheduledValues" === e.type ? t.cancelScheduledValues(e.time) : "setTargetAtTime" === e.type ? t.setTargetAtTime(e.value, e.time, e.constant) : t[e.type](e.value, e.time);
          }), this;
        }
        setParam(t) {
          Bn(this._swappable, "The Param must be assigned as 'swappable' in the constructor");
          const e = this.input;
          return e.disconnect(this._param), this.apply(t), this._param = t, e.connect(this._param), this;
        }
        dispose() {
          return super.dispose(), this._events.dispose(), this;
        }
        get defaultValue() {
          return this._toType(this._param.defaultValue);
        }
        _exponentialApproach(t, e, s, n, i) {
          return s + (e - s) * Math.exp(-(i - t) / n);
        }
        _linearInterpolate(t, e, s, n, i) {
          return e + (i - t) / (s - t) * (n - e);
        }
        _exponentialInterpolate(t, e, s, n, i) {
          return e * Math.pow(n / e, (i - t) / (s - t));
        }
      }
      class io extends eo {
        constructor() {
          super(...arguments), this._internalChannels = [];
        }
        get numberOfInputs() {
          return undefined !== this.input ? En(this.input) || this.input instanceof no ? 1 : this.input.numberOfInputs : 0;
        }
        get numberOfOutputs() {
          return undefined !== this.output ? this.output.numberOfOutputs : 0;
        }
        _isAudioNode(t) {
          return undefined !== t && (t instanceof io || Mn(t));
        }
        _getInternalNodes() {
          const t = this._internalChannels.slice(0);
          return this._isAudioNode(this.input) && t.push(this.input), this._isAudioNode(this.output) && this.input !== this.output && t.push(this.output), t;
        }
        _setChannelProperties(t) {
          this._getInternalNodes().forEach(e => {
            e.channelCount = t.channelCount, e.channelCountMode = t.channelCountMode, e.channelInterpretation = t.channelInterpretation;
          });
        }
        _getChannelProperties() {
          const t = this._getInternalNodes();
          Bn(t.length > 0, "ToneAudioNode does not have any internal nodes");
          const e = t[0];
          return {channelCount: e.channelCount, channelCountMode: e.channelCountMode, channelInterpretation: e.channelInterpretation};
        }
        get channelCount() {
          return this._getChannelProperties().channelCount;
        }
        set channelCount (t) {
          const e = this._getChannelProperties();
          this._setChannelProperties(Object.assign(e, {channelCount: t}));
        }
        get channelCountMode() {
          return this._getChannelProperties().channelCountMode;
        }
        set channelCountMode (t) {
          const e = this._getChannelProperties();
          this._setChannelProperties(Object.assign(e, {channelCountMode: t}));
        }
        get channelInterpretation() {
          return this._getChannelProperties().channelInterpretation;
        }
        set channelInterpretation (t) {
          const e = this._getChannelProperties();
          this._setChannelProperties(Object.assign(e, {channelInterpretation: t}));
        }
        connect(t, e = 0, s = 0) {
          return ro(this, t, e, s), this;
        }
        toDestination() {
          return this.connect(this.context.destination), this;
        }
        toMaster() {
          return Kn("toMaster() has been renamed toDestination()"), this.toDestination();
        }
        disconnect(t, e = 0, s = 0) {
          return ao(this, t, e, s), this;
        }
        chain(...t) {
          return oo(this, ...t), this;
        }
        fan(...t) {
          return t.forEach(t => this.connect(t)), this;
        }
        dispose() {
          return super.dispose(), undefined !== this.input && (this.input instanceof io ? this.input.dispose() : Mn(this.input) && this.input.disconnect()), undefined !== this.output && (this.output instanceof io ? this.output.dispose() : Mn(this.output) && this.output.disconnect()), this._internalChannels = [], this;
        }
      }
      function oo(...t) {
        const e = t.shift();
        t.reduce((t, e) => (t instanceof io ? t.connect(e) : Mn(t) && ro(t, e), e), e);
      }
      function ro(t, e, s = 0, n = 0) {
        for (Bn(undefined !== t, "Cannot connect from undefined node"), Bn(undefined !== e, "Cannot connect to undefined node"), (e instanceof io || Mn(e)) && Bn(e.numberOfInputs > 0, "Cannot connect to node with no inputs"), Bn(t.numberOfOutputs > 0, "Cannot connect from node with no outputs"); e instanceof io || e instanceof no;) undefined !== e.input && (e = e.input);
        for (; t instanceof io;) undefined !== t.output && (t = t.output);
        En(e) ? t.connect(e, s) : t.connect(e, s, n);
      }
      function ao(t, e, s = 0, n = 0) {
        if (undefined !== e) for (; e instanceof io;) e = e.input;
        for (; !Mn(t);) undefined !== t.output && (t = t.output);
        En(e) ? t.disconnect(e, s) : Mn(e) ? t.disconnect(e, s, n) : t.disconnect();
      }
      function co(...t) {
        const e = t.pop();
        undefined !== e && t.forEach(t => ro(t, e));
      }
      class ho extends io {
        constructor() {
          const t = ui(ho.getDefaults(), arguments, ["gain", "units"]);
          super(t), this.name = "Gain", this._gainNode = this.context.createGain(), this.input = this._gainNode, this.output = this._gainNode, this.gain = new no({context: this.context, convert: t.convert, param: this._gainNode.gain, units: t.units, value: t.gain, minValue: t.minValue, maxValue: t.maxValue}), Di(this, "gain");
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {convert: true, gain: 1, units: "gain"});
        }
        dispose() {
          return super.dispose(), this._gainNode.disconnect(), this.gain.dispose(), this;
        }
      }
      class lo extends io {
        constructor(t) {
          super(t), this.onended = Ei, this._startTime = -1, this._stopTime = -1, this._timeout = -1, this.output = new ho({context: this.context, gain: 0}), this._gainNode = this.output, this.getStateAtTime = function (t) {
            const e = this.toSeconds(t);
            return -1 !== this._startTime && e >= this._startTime && (-1 === this._stopTime || e <= this._stopTime) ? "started" : "stopped";
          }, this._fadeIn = t.fadeIn, this._fadeOut = t.fadeOut, this._curve = t.curve, this.onended = t.onended;
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {curve: "linear", fadeIn: 0, fadeOut: 0, onended: Ei});
        }
        _startGain(t, e = 1) {
          Bn(-1 === this._startTime, "Source cannot be started more than once");
          const s = this.toSeconds(this._fadeIn);
          return this._startTime = t + s, this._startTime = Math.max(this._startTime, this.context.currentTime), s > 0 ? (this._gainNode.gain.setValueAtTime(0, t), "linear" === this._curve ? this._gainNode.gain.linearRampToValueAtTime(e, t + s) : this._gainNode.gain.exponentialApproachValueAtTime(e, t, s)) : this._gainNode.gain.setValueAtTime(e, t), this;
        }
        stop(t) {
          return this.log("stop", t), this._stopGain(this.toSeconds(t)), this;
        }
        _stopGain(t) {
          Bn(-1 !== this._startTime, "'start' must be called before 'stop'"), this.cancelStop();
          const e = this.toSeconds(this._fadeOut);
          return this._stopTime = this.toSeconds(t) + e, this._stopTime = Math.max(this._stopTime, this.now()), e > 0 ? "linear" === this._curve ? this._gainNode.gain.linearRampTo(0, e, t) : this._gainNode.gain.targetRampTo(0, e, t) : (this._gainNode.gain.cancelAndHoldAtTime(t), this._gainNode.gain.setValueAtTime(0, t)), this.context.clearTimeout(this._timeout), this._timeout = this.context.setTimeout(() => {
            const t = "exponential" === this._curve ? 2 * e : 0;
            this._stopSource(this.now() + t), this._onended();
          }, this._stopTime - this.context.currentTime), this;
        }
        _onended() {
          if (this.onended !== Ei && (this.onended(this), this.onended = Ei, !this.context.isOffline)) {
            const t = () => this.dispose();
            undefined !== window.requestIdleCallback ? window.requestIdleCallback(t) : setTimeout(t, 1e3);
          }
        }
        get state() {
          return this.getStateAtTime(this.now());
        }
        cancelStop() {
          return this.log("cancelStop"), Bn(-1 !== this._startTime, "Source is not started"), this._gainNode.gain.cancelScheduledValues(this._startTime + this.sampleTime), this.context.clearTimeout(this._timeout), this._stopTime = -1, this;
        }
        dispose() {
          return super.dispose(), this._gainNode.dispose(), this.onended = Ei, this;
        }
      }
      class uo extends lo {
        constructor() {
          const t = ui(uo.getDefaults(), arguments, ["offset"]);
          super(t), this.name = "ToneConstantSource", this._source = this.context.createConstantSource(), ro(this._source, this._gainNode), this.offset = new no({context: this.context, convert: t.convert, param: this._source.offset, units: t.units, value: t.offset, minValue: t.minValue, maxValue: t.maxValue});
        }
        static getDefaults() {
          return Object.assign(lo.getDefaults(), {convert: true, offset: 1, units: "number"});
        }
        start(t) {
          const e = this.toSeconds(t);
          return this.log("start", e), this._startGain(e), this._source.start(e), this;
        }
        _stopSource(t) {
          this._source.stop(t);
        }
        dispose() {
          return super.dispose(), "started" === this.state && this.stop(), this._source.disconnect(), this.offset.dispose(), this;
        }
      }
      class po extends io {
        constructor() {
          const t = ui(po.getDefaults(), arguments, ["value", "units"]);
          super(t), this.name = "Signal", this.override = true, this.output = this._constantSource = new uo({context: this.context, convert: t.convert, offset: t.value, units: t.units, minValue: t.minValue, maxValue: t.maxValue}), this._constantSource.start(0), this.input = this._param = this._constantSource.offset;
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {convert: true, units: "number", value: 0});
        }
        connect(t, e = 0, s = 0) {
          return fo(this, t, e, s), this;
        }
        dispose() {
          return super.dispose(), this._param.dispose(), this._constantSource.dispose(), this;
        }
        setValueAtTime(t, e) {
          return this._param.setValueAtTime(t, e), this;
        }
        getValueAtTime(t) {
          return this._param.getValueAtTime(t);
        }
        setRampPoint(t) {
          return this._param.setRampPoint(t), this;
        }
        linearRampToValueAtTime(t, e) {
          return this._param.linearRampToValueAtTime(t, e), this;
        }
        exponentialRampToValueAtTime(t, e) {
          return this._param.exponentialRampToValueAtTime(t, e), this;
        }
        exponentialRampTo(t, e, s) {
          return this._param.exponentialRampTo(t, e, s), this;
        }
        linearRampTo(t, e, s) {
          return this._param.linearRampTo(t, e, s), this;
        }
        targetRampTo(t, e, s) {
          return this._param.targetRampTo(t, e, s), this;
        }
        exponentialApproachValueAtTime(t, e, s) {
          return this._param.exponentialApproachValueAtTime(t, e, s), this;
        }
        setTargetAtTime(t, e, s) {
          return this._param.setTargetAtTime(t, e, s), this;
        }
        setValueCurveAtTime(t, e, s, n) {
          return this._param.setValueCurveAtTime(t, e, s, n), this;
        }
        cancelScheduledValues(t) {
          return this._param.cancelScheduledValues(t), this;
        }
        cancelAndHoldAtTime(t) {
          return this._param.cancelAndHoldAtTime(t), this;
        }
        rampTo(t, e, s) {
          return this._param.rampTo(t, e, s), this;
        }
        get value() {
          return this._param.value;
        }
        set value (t) {
          this._param.value = t;
        }
        get convert() {
          return this._param.convert;
        }
        set convert (t) {
          this._param.convert = t;
        }
        get units() {
          return this._param.units;
        }
        get overridden() {
          return this._param.overridden;
        }
        set overridden (t) {
          this._param.overridden = t;
        }
        get maxValue() {
          return this._param.maxValue;
        }
        get minValue() {
          return this._param.minValue;
        }
        apply(t) {
          return this._param.apply(t), this;
        }
      }
      function fo(t, e, s, n) {
        (e instanceof no || En(e) || e instanceof po && e.override) && (e.cancelScheduledValues(0), e.setValueAtTime(0, 0), e instanceof po && (e.overridden = true)), ro(t, e, s, n);
      }
      class _o extends no {
        constructor() {
          const t = ui(_o.getDefaults(), arguments, ["value"]);
          super(t), this.name = "TickParam", this._events = new wi(Infinity), this._multiplier = 1, this._multiplier = t.multiplier, this._events.cancel(0), this._events.add({ticks: 0, time: 0, type: "setValueAtTime", value: this._fromType(t.value)}), this.setValueAtTime(t.value, 0);
        }
        static getDefaults() {
          return Object.assign(no.getDefaults(), {multiplier: 1, units: "hertz", value: 1});
        }
        setTargetAtTime(t, e, s) {
          e = this.toSeconds(e), this.setRampPoint(e);
          const n = this._fromType(t), i = this._events.get(e), o = Math.round(Math.max(1 / s, 1));
          for (let t = 0; t <= o; t++) {
            const o = s * t + e, r = this._exponentialApproach(i.time, i.value, n, s, o);
            this.linearRampToValueAtTime(this._toType(r), o);
          }
          return this;
        }
        setValueAtTime(t, e) {
          const s = this.toSeconds(e);
          super.setValueAtTime(t, e);
          const n = this._events.get(s), i = this._events.previousEvent(n), o = this._getTicksUntilEvent(i, s);
          return n.ticks = Math.max(o, 0), this;
        }
        linearRampToValueAtTime(t, e) {
          const s = this.toSeconds(e);
          super.linearRampToValueAtTime(t, e);
          const n = this._events.get(s), i = this._events.previousEvent(n), o = this._getTicksUntilEvent(i, s);
          return n.ticks = Math.max(o, 0), this;
        }
        exponentialRampToValueAtTime(t, e) {
          e = this.toSeconds(e);
          const s = this._fromType(t), n = this._events.get(e), i = Math.round(Math.max(10 * (e - n.time), 1)), o = (e - n.time) / i;
          for (let t = 0; t <= i; t++) {
            const i = o * t + n.time, r = this._exponentialInterpolate(n.time, n.value, e, s, i);
            this.linearRampToValueAtTime(this._toType(r), i);
          }
          return this;
        }
        _getTicksUntilEvent(t, e) {
          if (null === t) t = {ticks: 0, time: 0, type: "setValueAtTime", value: 0}; else if (undefined === t.ticks) {
            const e = this._events.previousEvent(t);
            t.ticks = this._getTicksUntilEvent(e, t.time);
          }
          const s = this._fromType(this.getValueAtTime(t.time));
          let n = this._fromType(this.getValueAtTime(e));
          const i = this._events.get(e);
          return i && i.time === e && "setValueAtTime" === i.type && (n = this._fromType(this.getValueAtTime(e - this.sampleTime))), 0.5 * (e - t.time) * (s + n) + t.ticks;
        }
        getTicksAtTime(t) {
          const e = this.toSeconds(t), s = this._events.get(e);
          return Math.max(this._getTicksUntilEvent(s, e), 0);
        }
        getDurationOfTicks(t, e) {
          const s = this.toSeconds(e), n = this.getTicksAtTime(e);
          return this.getTimeOfTick(n + t) - s;
        }
        getTimeOfTick(t) {
          const e = this._events.get(t, "ticks"), s = this._events.getAfter(t, "ticks");
          if (e && e.ticks === t) return e.time;
          if (e && s && "linearRampToValueAtTime" === s.type && e.value !== s.value) {
            const n = this._fromType(this.getValueAtTime(e.time)), i = (this._fromType(this.getValueAtTime(s.time)) - n) / (s.time - e.time), o = Math.sqrt(Math.pow(n, 2) - 2 * i * (e.ticks - t)), r = (-n + o) / i;
            return (r > 0 ? r : (-n - o) / i) + e.time;
          }
          return e ? 0 === e.value ? Infinity : e.time + (t - e.ticks) / e.value : t / this._initialValue;
        }
        ticksToTime(t, e) {
          return this.getDurationOfTicks(t, e);
        }
        timeToTicks(t, e) {
          const s = this.toSeconds(e), n = this.toSeconds(t), i = this.getTicksAtTime(s);
          return this.getTicksAtTime(s + n) - i;
        }
        _fromType(t) {
          return "bpm" === this.units && this.multiplier ? 1 / (60 / t / this.multiplier) : super._fromType(t);
        }
        _toType(t) {
          return "bpm" === this.units && this.multiplier ? t / this.multiplier * 60 : super._toType(t);
        }
        get multiplier() {
          return this._multiplier;
        }
        set multiplier (t) {
          const e = this.value;
          this._multiplier = t, this.cancelScheduledValues(0), this.setValueAtTime(e, 0);
        }
      }
      class mo extends po {
        constructor() {
          const t = ui(mo.getDefaults(), arguments, ["value"]);
          super(t), this.name = "TickSignal", this.input = this._param = new _o({context: this.context, convert: t.convert, multiplier: t.multiplier, param: this._constantSource.offset, units: t.units, value: t.value});
        }
        static getDefaults() {
          return Object.assign(po.getDefaults(), {multiplier: 1, units: "hertz", value: 1});
        }
        ticksToTime(t, e) {
          return this._param.ticksToTime(t, e);
        }
        timeToTicks(t, e) {
          return this._param.timeToTicks(t, e);
        }
        getTimeOfTick(t) {
          return this._param.getTimeOfTick(t);
        }
        getDurationOfTicks(t, e) {
          return this._param.getDurationOfTicks(t, e);
        }
        getTicksAtTime(t) {
          return this._param.getTicksAtTime(t);
        }
        get multiplier() {
          return this._param.multiplier;
        }
        set multiplier (t) {
          this._param.multiplier = t;
        }
        dispose() {
          return super.dispose(), this._param.dispose(), this;
        }
      }
      class go extends eo {
        constructor() {
          const t = ui(go.getDefaults(), arguments, ["frequency"]);
          super(t), this.name = "TickSource", this._state = new so, this._tickOffset = new wi, this._ticksAtTime = new wi, this._secondsAtTime = new wi, this.frequency = new mo({context: this.context, units: t.units, value: t.frequency}), Di(this, "frequency"), this._state.setStateAtTime("stopped", 0), this.setTicksAtTime(0, 0);
        }
        static getDefaults() {
          return Object.assign({frequency: 1, units: "hertz"}, eo.getDefaults());
        }
        get state() {
          return this.getStateAtTime(this.now());
        }
        start(t, e) {
          const s = this.toSeconds(t);
          return "started" !== this._state.getValueAtTime(s) && (this._state.setStateAtTime("started", s), undefined !== e && this.setTicksAtTime(e, s), this._ticksAtTime.cancel(s), this._secondsAtTime.cancel(s)), this;
        }
        stop(t) {
          const e = this.toSeconds(t);
          if ("stopped" === this._state.getValueAtTime(e)) {
            const t = this._state.get(e);
            t && t.time > 0 && (this._tickOffset.cancel(t.time), this._state.cancel(t.time));
          }
          return this._state.cancel(e), this._state.setStateAtTime("stopped", e), this.setTicksAtTime(0, e), this._ticksAtTime.cancel(e), this._secondsAtTime.cancel(e), this;
        }
        pause(t) {
          const e = this.toSeconds(t);
          return "started" === this._state.getValueAtTime(e) && (this._state.setStateAtTime("paused", e), this._ticksAtTime.cancel(e), this._secondsAtTime.cancel(e)), this;
        }
        cancel(t) {
          return t = this.toSeconds(t), this._state.cancel(t), this._tickOffset.cancel(t), this._ticksAtTime.cancel(t), this._secondsAtTime.cancel(t), this;
        }
        getTicksAtTime(t) {
          const e = this.toSeconds(t), s = this._state.getLastState("stopped", e), n = this._ticksAtTime.get(e), i = {state: "paused", time: e};
          this._state.add(i);
          let o = n || s, r = n ? n.ticks : 0, a = null;
          return this._state.forEachBetween(o.time, e + this.sampleTime, t => {
            let e = o.time;
            const s = this._tickOffset.get(t.time);
            s && s.time >= o.time && (r = s.ticks, e = s.time), "started" === o.state && "started" !== t.state && (r += this.frequency.getTicksAtTime(t.time) - this.frequency.getTicksAtTime(e), t.time !== i.time && (a = {state: t.state, time: t.time, ticks: r})), o = t;
          }), this._state.remove(i), a && this._ticksAtTime.add(a), r;
        }
        get ticks() {
          return this.getTicksAtTime(this.now());
        }
        set ticks (t) {
          this.setTicksAtTime(t, this.now());
        }
        get seconds() {
          return this.getSecondsAtTime(this.now());
        }
        set seconds (t) {
          const e = this.now(), s = this.frequency.timeToTicks(t, e);
          this.setTicksAtTime(s, e);
        }
        getSecondsAtTime(t) {
          t = this.toSeconds(t);
          const e = this._state.getLastState("stopped", t), s = {state: "paused", time: t};
          this._state.add(s);
          const n = this._secondsAtTime.get(t);
          let i = n || e, o = n ? n.seconds : 0, r = null;
          return this._state.forEachBetween(i.time, t + this.sampleTime, t => {
            let e = i.time;
            const n = this._tickOffset.get(t.time);
            n && n.time >= i.time && (o = n.seconds, e = n.time), "started" === i.state && "started" !== t.state && (o += t.time - e, t.time !== s.time && (r = {state: t.state, time: t.time, seconds: o})), i = t;
          }), this._state.remove(s), r && this._secondsAtTime.add(r), o;
        }
        setTicksAtTime(t, e) {
          return e = this.toSeconds(e), this._tickOffset.cancel(e), this._tickOffset.add({seconds: this.frequency.getDurationOfTicks(t, e), ticks: t, time: e}), this._ticksAtTime.cancel(e), this._secondsAtTime.cancel(e), this;
        }
        getStateAtTime(t) {
          return t = this.toSeconds(t), this._state.getValueAtTime(t);
        }
        getTimeOfTick(t, e = this.now()) {
          const s = this._tickOffset.get(e), n = this._state.get(e), i = Math.max(s.time, n.time), o = this.frequency.getTicksAtTime(i) + t - s.ticks;
          return this.frequency.getTimeOfTick(o);
        }
        forEachTickBetween(t, e, s) {
          let n = this._state.get(t);
          this._state.forEachBetween(t, e, e => {
            n && "started" === n.state && "started" !== e.state && this.forEachTickBetween(Math.max(n.time, t), e.time - this.sampleTime, s), n = e;
          });
          let i = null;
          if (n && "started" === n.state) {
            const o = Math.max(n.time, t), r = this.frequency.getTicksAtTime(o), a = r - this.frequency.getTicksAtTime(n.time);
            let c = Math.ceil(a) - a;
            c = Math.abs(c - 1) < _i ? 0 : c;
            let h = this.frequency.getTimeOfTick(r + c);
            for (; h < e;) {
              try {
                s(h, Math.round(this.getTicksAtTime(h)));
              } catch (t) {
                i = t;
                break;
              }
              h += this.frequency.getDurationOfTicks(1, h);
            }
          }
          if (i) throw i;
          return this;
        }
        dispose() {
          return super.dispose(), this._state.dispose(), this._tickOffset.dispose(), this._ticksAtTime.dispose(), this._secondsAtTime.dispose(), this.frequency.dispose(), this;
        }
      }
      class vo extends eo {
        constructor() {
          const t = ui(vo.getDefaults(), arguments, ["callback", "frequency"]);
          super(t), this.name = "Clock", this.callback = Ei, this._lastUpdate = 0, this._state = new so("stopped"), this._boundLoop = this._loop.bind(this), this.callback = t.callback, this._tickSource = new go({context: this.context, frequency: t.frequency, units: t.units}), this._lastUpdate = 0, this.frequency = this._tickSource.frequency, Di(this, "frequency"), this._state.setStateAtTime("stopped", 0), this.context.on("tick", this._boundLoop);
        }
        static getDefaults() {
          return Object.assign(eo.getDefaults(), {callback: Ei, frequency: 1, units: "hertz"});
        }
        get state() {
          return this._state.getValueAtTime(this.now());
        }
        start(t, e) {
          Gn(this.context);
          const s = this.toSeconds(t);
          return this.log("start", s), "started" !== this._state.getValueAtTime(s) && (this._state.setStateAtTime("started", s), this._tickSource.start(s, e), s < this._lastUpdate && this.emit("start", s, e)), this;
        }
        stop(t) {
          const e = this.toSeconds(t);
          return this.log("stop", e), this._state.cancel(e), this._state.setStateAtTime("stopped", e), this._tickSource.stop(e), e < this._lastUpdate && this.emit("stop", e), this;
        }
        pause(t) {
          const e = this.toSeconds(t);
          return "started" === this._state.getValueAtTime(e) && (this._state.setStateAtTime("paused", e), this._tickSource.pause(e), e < this._lastUpdate && this.emit("pause", e)), this;
        }
        get ticks() {
          return Math.ceil(this.getTicksAtTime(this.now()));
        }
        set ticks (t) {
          this._tickSource.ticks = t;
        }
        get seconds() {
          return this._tickSource.seconds;
        }
        set seconds (t) {
          this._tickSource.seconds = t;
        }
        getSecondsAtTime(t) {
          return this._tickSource.getSecondsAtTime(t);
        }
        setTicksAtTime(t, e) {
          return this._tickSource.setTicksAtTime(t, e), this;
        }
        getTimeOfTick(t, e = this.now()) {
          return this._tickSource.getTimeOfTick(t, e);
        }
        getTicksAtTime(t) {
          return this._tickSource.getTicksAtTime(t);
        }
        nextTickTime(t, e) {
          const s = this.toSeconds(e), n = this.getTicksAtTime(s);
          return this._tickSource.getTimeOfTick(n + t, s);
        }
        _loop() {
          const t = this._lastUpdate, e = this.now();
          this._lastUpdate = e, this.log("loop", t, e), t !== e && (this._state.forEachBetween(t, e, t => {
            switch (t.state) {
              case "started":
                const e = this._tickSource.getTicksAtTime(t.time);
                this.emit("start", t.time, e);
                break;
              case "stopped":
                0 !== t.time && this.emit("stop", t.time);
                break;
              case "paused":
                this.emit("pause", t.time);
            }
          }), this._tickSource.forEachTickBetween(t, e, (t, e) => {
            this.callback(t, e);
          }));
        }
        getStateAtTime(t) {
          const e = this.toSeconds(t);
          return this._state.getValueAtTime(e);
        }
        dispose() {
          return super.dispose(), this.context.off("tick", this._boundLoop), this._tickSource.dispose(), this._state.dispose(), this;
        }
      }
      Ai.mixin(vo);
      class yo extends io {
        constructor() {
          const t = ui(yo.getDefaults(), arguments, ["delayTime", "maxDelay"]);
          super(t), this.name = "Delay";
          const e = this.toSeconds(t.maxDelay);
          this._maxDelay = Math.max(e, this.toSeconds(t.delayTime)), this._delayNode = this.input = this.output = this.context.createDelay(e), this.delayTime = new no({context: this.context, param: this._delayNode.delayTime, units: "time", value: t.delayTime, minValue: 0, maxValue: this.maxDelay}), Di(this, "delayTime");
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {delayTime: 0, maxDelay: 1});
        }
        get maxDelay() {
          return this._maxDelay;
        }
        dispose() {
          return super.dispose(), this._delayNode.disconnect(), this.delayTime.dispose(), this;
        }
      }
      class xo extends io {
        constructor() {
          const t = ui(xo.getDefaults(), arguments, ["volume"]);
          super(t), this.name = "Volume", this.input = this.output = new ho({context: this.context, gain: t.volume, units: "decibels"}), this.volume = this.output.gain, Di(this, "volume"), this._unmutedVolume = t.volume, this.mute = t.mute;
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {mute: false, volume: 0});
        }
        get mute() {
          return this.volume.value === -Infinity;
        }
        set mute (t) {
          !this.mute && t ? (this._unmutedVolume = this.volume.value, this.volume.value = -Infinity) : this.mute && !t && (this.volume.value = this._unmutedVolume);
        }
        dispose() {
          return super.dispose(), this.input.dispose(), this.volume.dispose(), this;
        }
      }
      class wo extends io {
        constructor() {
          const t = ui(wo.getDefaults(), arguments);
          super(t), this.name = "Destination", this.input = new xo({context: this.context}), this.output = new ho({context: this.context}), this.volume = this.input.volume, oo(this.input, this.output, this.context.rawContext.destination), this.mute = t.mute, this._internalChannels = [this.input, this.context.rawContext.destination, this.output];
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {mute: false, volume: 0});
        }
        get mute() {
          return this.input.mute;
        }
        set mute (t) {
          this.input.mute = t;
        }
        chain(...t) {
          return this.input.disconnect(), t.unshift(this.input), t.push(this.output), oo(...t), this;
        }
        get maxChannelCount() {
          return this.context.rawContext.destination.maxChannelCount;
        }
        dispose() {
          return super.dispose(), this.volume.dispose(), this;
        }
      }
      Ti(t => {
        t.destination = new wo({context: t});
      }), ki(t => {
        t.destination.dispose();
      });
      class bo extends io {
        constructor() {
          super(...arguments), this.name = "Listener", this.positionX = new no({context: this.context, param: this.context.rawContext.listener.positionX}), this.positionY = new no({context: this.context, param: this.context.rawContext.listener.positionY}), this.positionZ = new no({context: this.context, param: this.context.rawContext.listener.positionZ}), this.forwardX = new no({context: this.context, param: this.context.rawContext.listener.forwardX}), this.forwardY = new no({context: this.context, param: this.context.rawContext.listener.forwardY}), this.forwardZ = new no({context: this.context, param: this.context.rawContext.listener.forwardZ}), this.upX = new no({context: this.context, param: this.context.rawContext.listener.upX}), this.upY = new no({context: this.context, param: this.context.rawContext.listener.upY}), this.upZ = new no({context: this.context, param: this.context.rawContext.listener.upZ});
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {positionX: 0, positionY: 0, positionZ: 0, forwardX: 0, forwardY: 0, forwardZ: -1, upX: 0, upY: 1, upZ: 0});
        }
        dispose() {
          return super.dispose(), this.positionX.dispose(), this.positionY.dispose(), this.positionZ.dispose(), this.forwardX.dispose(), this.forwardY.dispose(), this.forwardZ.dispose(), this.upX.dispose(), this.upY.dispose(), this.upZ.dispose(), this;
        }
      }
      function To(t, e) {
        return ni(this, arguments, undefined, function* (t, e, s = 2, n = (Fi === Ii && ei && Ni(new Oi), Fi).sampleRate) {
          const i = (Fi === Ii && ei && Ni(new Oi), Fi), o = new qi(s, e, n);
          Ni(o), yield t(o);
          const r = o.render();
          Ni(i);
          const a = yield r;
          return new Ri(a);
        });
      }
      Ti(t => {
        t.listener = new bo({context: t});
      }), ki(t => {
        t.listener.dispose();
      });
      class So extends fi {
        constructor() {
          super(), this.name = "ToneAudioBuffers", this._buffers = new Map, this._loadingCount = 0;
          const t = ui(So.getDefaults(), arguments, ["urls", "onload", "baseUrl"], "urls");
          this.baseUrl = t.baseUrl, Object.keys(t.urls).forEach(e => {
            this._loadingCount++;
            const s = t.urls[e];
            this.add(e, s, this._bufferLoaded.bind(this, t.onload), t.onerror);
          });
        }
        static getDefaults() {
          return {baseUrl: "", onerror: Ei, onload: Ei, urls: {}};
        }
        has(t) {
          return this._buffers.has(t.toString());
        }
        get(t) {
          return Bn(this.has(t), `ToneAudioBuffers has no buffer named: ${t}`), this._buffers.get(t.toString());
        }
        _bufferLoaded(t) {
          this._loadingCount--, 0 === this._loadingCount && t && t();
        }
        get loaded() {
          return Array.from(this._buffers).every(([t, e]) => e.loaded);
        }
        add(t, e, s = Ei, n = Ei) {
          return "string" == typeof e ? (this.baseUrl && "data:audio/" === e.trim().substring(0, 11).toLowerCase() && (this.baseUrl = ""), this._buffers.set(t.toString(), new Ri(this.baseUrl + e, s, n))) : this._buffers.set(t.toString(), new Ri(e, s, n)), this;
        }
        dispose() {
          return super.dispose(), this._buffers.forEach(t => t.dispose()), this._buffers.clear(), this;
        }
      }
      class ko extends Yi {
        constructor() {
          super(...arguments), this.name = "MidiClass", this.defaultUnits = "midi";
        }
        _frequencyToUnits(t) {
          return Math.round(69 + 12 * Math.log2(super._frequencyToUnits(t) / Wi));
        }
        _ticksToUnits(t) {
          return Math.round(69 + 12 * Math.log2(super._ticksToUnits(t) / Wi));
        }
        _beatsToUnits(t) {
          return Math.round(69 + 12 * Math.log2(super._beatsToUnits(t) / Wi));
        }
        _secondsToUnits(t) {
          return Math.round(69 + 12 * Math.log2(super._secondsToUnits(t) / Wi));
        }
        toMidi() {
          return this.valueOf();
        }
        toFrequency() {
          return Wi * Math.pow(2, (this.toMidi() - 69) / 12);
        }
        transpose(t) {
          return new ko(this.context, this.toMidi() + t);
        }
      }
      function Ao(t, e) {
        return new ko((Fi === Ii && ei && Ni(new Oi), Fi), t, e);
      }
      class Co extends Ki {
        constructor() {
          super(...arguments), this.name = "Ticks", this.defaultUnits = "i";
        }
        _now() {
          return this.context.transport.ticks;
        }
        _beatsToUnits(t) {
          return this._getPPQ() * t;
        }
        _secondsToUnits(t) {
          return Math.floor(t / (60 / this._getBpm()) * this._getPPQ());
        }
        _ticksToUnits(t) {
          return t;
        }
        toTicks() {
          return this.valueOf();
        }
        toSeconds() {
          return this.valueOf() / this._getPPQ() * (60 / this._getBpm());
        }
      }
      function Oo(t, e) {
        return new Co((Fi === Ii && ei && Ni(new Oi), Fi), t, e);
      }
      class Do extends eo {
        constructor() {
          super(...arguments), this.name = "Draw", this.expiration = 0.25, this.anticipation = 0.008, this._events = new wi, this._boundDrawLoop = this._drawLoop.bind(this), this._animationFrame = -1;
        }
        schedule(t, e) {
          return this._events.add({callback: t, time: this.toSeconds(e)}), 1 === this._events.length && (this._animationFrame = requestAnimationFrame(this._boundDrawLoop)), this;
        }
        cancel(t) {
          return this._events.cancel(this.toSeconds(t)), this;
        }
        _drawLoop() {
          const t = this.context.currentTime;
          for (; this._events.length && this._events.peek().time - this.anticipation <= t;) {
            const e = this._events.shift();
            e && t - e.time <= this.expiration && e.callback();
          }
          this._events.length > 0 && (this._animationFrame = requestAnimationFrame(this._boundDrawLoop));
        }
        dispose() {
          return super.dispose(), this._events.dispose(), cancelAnimationFrame(this._animationFrame), this;
        }
      }
      Ti(t => {
        t.draw = new Do({context: t});
      }), ki(t => {
        t.draw.dispose();
      });
      class Mo extends fi {
        constructor() {
          super(...arguments), this.name = "IntervalTimeline", this._root = null, this._length = 0;
        }
        add(t) {
          Bn(undefined !== t.time, "Events must have a time property"), Bn(undefined !== t.duration, "Events must have a duration parameter"), t.time = t.time.valueOf();
          let e = new Eo(t.time, t.time + t.duration, t);
          for (null === this._root ? this._root = e : this._root.insert(e), this._length++; null !== e;) e.updateHeight(), e.updateMax(), this._rebalance(e), e = e.parent;
          return this;
        }
        remove(t) {
          if (null !== this._root) {
            const e = [];
            this._root.search(t.time, e);
            for (const s of e) if (s.event === t) {
              this._removeNode(s), this._length--;
              break;
            }
          }
          return this;
        }
        get length() {
          return this._length;
        }
        cancel(t) {
          return this.forEachFrom(t, t => this.remove(t)), this;
        }
        _setRoot(t) {
          this._root = t, null !== this._root && (this._root.parent = null);
        }
        _replaceNodeInParent(t, e) {
          null !== t.parent ? (t.isLeftChild() ? t.parent.left = e : t.parent.right = e, this._rebalance(t.parent)) : this._setRoot(e);
        }
        _removeNode(t) {
          if (null === t.left && null === t.right) this._replaceNodeInParent(t, null); else if (null === t.right) this._replaceNodeInParent(t, t.left); else if (null === t.left) this._replaceNodeInParent(t, t.right); else {
            let e, s = null;
            if (t.getBalance() > 0) if (null === t.left.right) e = t.left, e.right = t.right, s = e; else {
              for (e = t.left.right; null !== e.right;) e = e.right;
              e.parent && (e.parent.right = e.left, s = e.parent, e.left = t.left, e.right = t.right);
            } else if (null === t.right.left) e = t.right, e.left = t.left, s = e; else {
              for (e = t.right.left; null !== e.left;) e = e.left;
              e.parent && (e.parent.left = e.right, s = e.parent, e.left = t.left, e.right = t.right);
            }
            null !== t.parent ? t.isLeftChild() ? t.parent.left = e : t.parent.right = e : this._setRoot(e), s && this._rebalance(s);
          }
          t.dispose();
        }
        _rotateLeft(t) {
          const e = t.parent, s = t.isLeftChild(), n = t.right;
          n && (t.right = n.left, n.left = t), null !== e ? s ? e.left = n : e.right = n : this._setRoot(n);
        }
        _rotateRight(t) {
          const e = t.parent, s = t.isLeftChild(), n = t.left;
          n && (t.left = n.right, n.right = t), null !== e ? s ? e.left = n : e.right = n : this._setRoot(n);
        }
        _rebalance(t) {
          const e = t.getBalance();
          e > 1 && t.left ? t.left.getBalance() < 0 ? this._rotateLeft(t.left) : this._rotateRight(t) : e < -1 && t.right && (t.right.getBalance() > 0 ? this._rotateRight(t.right) : this._rotateLeft(t));
        }
        get(t) {
          if (null !== this._root) {
            const e = [];
            if (this._root.search(t, e), e.length > 0) {
              let t = e[0];
              for (let s = 1; s < e.length; s++) e[s].low > t.low && (t = e[s]);
              return t.event;
            }
          }
          return null;
        }
        forEach(t) {
          if (null !== this._root) {
            const e = [];
            this._root.traverse(t => e.push(t)), e.forEach(e => {
              e.event && t(e.event);
            });
          }
          return this;
        }
        forEachAtTime(t, e) {
          if (null !== this._root) {
            const s = [];
            this._root.search(t, s), s.forEach(t => {
              t.event && e(t.event);
            });
          }
          return this;
        }
        forEachFrom(t, e) {
          if (null !== this._root) {
            const s = [];
            this._root.searchAfter(t, s), s.forEach(t => {
              t.event && e(t.event);
            });
          }
          return this;
        }
        dispose() {
          return super.dispose(), null !== this._root && this._root.traverse(t => t.dispose()), this._root = null, this;
        }
      }
      class Eo {
        constructor(t, e, s) {
          this._left = null, this._right = null, this.parent = null, this.height = 0, this.event = s, this.low = t, this.high = e, this.max = this.high;
        }
        insert(t) {
          t.low <= this.low ? null === this.left ? this.left = t : this.left.insert(t) : null === this.right ? this.right = t : this.right.insert(t);
        }
        search(t, e) {
          t > this.max || (null !== this.left && this.left.search(t, e), this.low <= t && this.high > t && e.push(this), this.low > t || null !== this.right && this.right.search(t, e));
        }
        searchAfter(t, e) {
          this.low >= t && (e.push(this), null !== this.left && this.left.searchAfter(t, e)), null !== this.right && this.right.searchAfter(t, e);
        }
        traverse(t) {
          t(this), null !== this.left && this.left.traverse(t), null !== this.right && this.right.traverse(t);
        }
        updateHeight() {
          null !== this.left && null !== this.right ? this.height = Math.max(this.left.height, this.right.height) + 1 : null !== this.right ? this.height = this.right.height + 1 : null !== this.left ? this.height = this.left.height + 1 : this.height = 0;
        }
        updateMax() {
          this.max = this.high, null !== this.left && (this.max = Math.max(this.max, this.left.max)), null !== this.right && (this.max = Math.max(this.max, this.right.max));
        }
        getBalance() {
          let t = 0;
          return null !== this.left && null !== this.right ? t = this.left.height - this.right.height : null !== this.left ? t = this.left.height + 1 : null !== this.right && (t = -(this.right.height + 1)), t;
        }
        isLeftChild() {
          return null !== this.parent && this.parent.left === this;
        }
        get left() {
          return this._left;
        }
        set left (t) {
          this._left = t, null !== t && (t.parent = this), this.updateHeight(), this.updateMax();
        }
        get right() {
          return this._right;
        }
        set right (t) {
          this._right = t, null !== t && (t.parent = this), this.updateHeight(), this.updateMax();
        }
        dispose() {
          this.parent = null, this._left = null, this._right = null, this.event = null;
        }
      }
      class Ro extends fi {
        constructor(t) {
          super(), this.name = "TimelineValue", this._timeline = new wi({memory: 10}), this._initialValue = t;
        }
        set(t, e) {
          return this._timeline.add({value: t, time: e}), this;
        }
        get(t) {
          const e = this._timeline.get(t);
          return e ? e.value : this._initialValue;
        }
      }
      class qo extends io {
        constructor() {
          super(ui(qo.getDefaults(), arguments, ["context"]));
        }
        connect(t, e = 0, s = 0) {
          return fo(this, t, e, s), this;
        }
      }
      class Io extends qo {
        constructor() {
          const t = ui(Io.getDefaults(), arguments, ["mapping", "length"]);
          super(t), this.name = "WaveShaper", this._shaper = this.context.createWaveShaper(), this.input = this._shaper, this.output = this._shaper, Array.isArray(t.mapping) || t.mapping instanceof Float32Array ? this.curve = Float32Array.from(t.mapping) : "function" == typeof t.mapping && this.setMap(t.mapping, t.length);
        }
        static getDefaults() {
          return Object.assign(po.getDefaults(), {length: 1024});
        }
        setMap(t, e = 1024) {
          const s = new Float32Array(e);
          for (let n = 0, i = e; n < i; n++) {
            const e = n / (i - 1) * 2 - 1;
            s[n] = t(e, n);
          }
          return this.curve = s, this;
        }
        get curve() {
          return this._shaper.curve;
        }
        set curve (t) {
          this._shaper.curve = t;
        }
        get oversample() {
          return this._shaper.oversample;
        }
        set oversample (t) {
          Bn(["none", "2x", "4x"].some(e => e.includes(t)), "oversampling must be either 'none', '2x', or '4x'"), this._shaper.oversample = t;
        }
        dispose() {
          return super.dispose(), this._shaper.disconnect(), this;
        }
      }
      class Fo extends qo {
        constructor() {
          const t = ui(Fo.getDefaults(), arguments, ["value"]);
          super(t), this.name = "Pow", this._exponentScaler = this.input = this.output = new Io({context: this.context, mapping: this._expFunc(t.value), length: 8192}), this._exponent = t.value;
        }
        static getDefaults() {
          return Object.assign(qo.getDefaults(), {value: 1});
        }
        _expFunc(t) {
          return e => Math.pow(Math.abs(e), t);
        }
        get value() {
          return this._exponent;
        }
        set value (t) {
          this._exponent = t, this._exponentScaler.setMap(this._expFunc(this._exponent));
        }
        dispose() {
          return super.dispose(), this._exponentScaler.dispose(), this;
        }
      }
      class Vo {
        constructor(t, e) {
          this.id = Vo._eventId++, this._remainderTime = 0;
          const s = Object.assign(Vo.getDefaults(), e);
          this.transport = t, this.callback = s.callback, this._once = s.once, this.time = Math.floor(s.time), this._remainderTime = s.time - this.time;
        }
        static getDefaults() {
          return {callback: Ei, once: false, time: 0};
        }
        get floatTime() {
          return this.time + this._remainderTime;
        }
        invoke(t) {
          if (this.callback) {
            const e = this.transport.bpm.getDurationOfTicks(1, t);
            this.callback(t + this._remainderTime * e), this._once && this.transport.clear(this.id);
          }
        }
        dispose() {
          return this.callback = undefined, this;
        }
      }
      Vo._eventId = 0;
      class No extends Vo {
        constructor(t, e) {
          super(t, e), this._currentId = -1, this._nextId = -1, this._nextTick = this.time, this._boundRestart = this._restart.bind(this);
          const s = Object.assign(No.getDefaults(), e);
          this.duration = s.duration, this._interval = s.interval, this._nextTick = s.time, this.transport.on("start", this._boundRestart), this.transport.on("loopStart", this._boundRestart), this.transport.on("ticks", this._boundRestart), this.context = this.transport.context, this._restart();
        }
        static getDefaults() {
          return Object.assign({}, Vo.getDefaults(), {duration: Infinity, interval: 1, once: false});
        }
        invoke(t) {
          this._createEvents(t), super.invoke(t);
        }
        _createEvent() {
          return this._nextTick + _i < this.floatTime + this.duration ? this.transport.scheduleOnce(this.invoke.bind(this), new Co(this.context, this._nextTick).toSeconds()) : -1;
        }
        _createEvents(t) {
          this._nextTick + this._interval + _i < this.floatTime + this.duration && (this._nextTick += this._interval, this._currentId = this._nextId, this._nextId = this.transport.scheduleOnce(this.invoke.bind(this), new Co(this.context, this._nextTick).toSeconds()));
        }
        _restart(t) {
          this.transport.clear(this._currentId), this.transport.clear(this._nextId), this._nextTick = this.floatTime;
          const e = this.transport.getTicksAtTime(t);
          e > this.time + _i && (this._nextTick = this.floatTime + Math.ceil((e - this.floatTime) / this._interval) * this._interval), this._currentId = this._createEvent(), this._nextTick += this._interval, this._nextId = this._createEvent();
        }
        dispose() {
          return super.dispose(), this.transport.clear(this._currentId), this.transport.clear(this._nextId), this.transport.off("start", this._boundRestart), this.transport.off("loopStart", this._boundRestart), this.transport.off("ticks", this._boundRestart), this;
        }
      }
      class Po extends eo {
        constructor() {
          const t = ui(Po.getDefaults(), arguments);
          super(t), this.name = "Transport", this._loop = new Ro(false), this._loopStart = 0, this._loopEnd = 0, this._scheduledEvents = {}, this._timeline = new wi, this._repeatedEvents = new Mo, this._syncedSignals = [], this._swingAmount = 0, this._ppq = t.ppq, this._clock = new vo({callback: this._processTick.bind(this), context: this.context, frequency: 0, units: "bpm"}), this._bindClockEvents(), this.bpm = this._clock.frequency, this._clock.frequency.multiplier = t.ppq, this.bpm.setValueAtTime(t.bpm, 0), Di(this, "bpm"), this._timeSignature = t.timeSignature, this._swingTicks = t.ppq / 2;
        }
        static getDefaults() {
          return Object.assign(eo.getDefaults(), {bpm: 120, loopEnd: "4m", loopStart: 0, ppq: 192, swing: 0, swingSubdivision: "8n", timeSignature: 4});
        }
        _processTick(t, e) {
          if (this._loop.get(t) && e >= this._loopEnd && (this.emit("loopEnd", t), this._clock.setTicksAtTime(this._loopStart, t), e = this._loopStart, this.emit("loopStart", t, this._clock.getSecondsAtTime(t)), this.emit("loop", t)), this._swingAmount > 0 && e % this._ppq != 0 && e % (2 * this._swingTicks) != 0) {
            const s = e % (2 * this._swingTicks) / (2 * this._swingTicks), n = Math.sin(s * Math.PI) * this._swingAmount;
            t += new Co(this.context, 2 * this._swingTicks / 3).toSeconds() * n;
          }
          Xn(true), this._timeline.forEachAtTime(e, e => e.invoke(t)), Xn(false);
        }
        schedule(t, e) {
          const s = new Vo(this, {callback: t, time: new Ki(this.context, e).toTicks()});
          return this._addEvent(s, this._timeline);
        }
        scheduleRepeat(t, e, s, n = Infinity) {
          const i = new No(this, {callback: t, duration: new Zi(this.context, n).toTicks(), interval: new Zi(this.context, e).toTicks(), time: new Ki(this.context, s).toTicks()});
          return this._addEvent(i, this._repeatedEvents);
        }
        scheduleOnce(t, e) {
          const s = new Vo(this, {callback: t, once: true, time: new Ki(this.context, e).toTicks()});
          return this._addEvent(s, this._timeline);
        }
        clear(t) {
          if (this._scheduledEvents.hasOwnProperty(t)) {
            const e = this._scheduledEvents[t.toString()];
            e.timeline.remove(e.event), e.event.dispose(), delete this._scheduledEvents[t.toString()];
          }
          return this;
        }
        _addEvent(t, e) {
          return this._scheduledEvents[t.id.toString()] = {event: t, timeline: e}, e.add(t), t.id;
        }
        cancel(t = 0) {
          const e = this.toTicks(t);
          return this._timeline.forEachFrom(e, t => this.clear(t.id)), this._repeatedEvents.forEachFrom(e, t => this.clear(t.id)), this;
        }
        _bindClockEvents() {
          this._clock.on("start", (t, e) => {
            e = new Co(this.context, e).toSeconds(), this.emit("start", t, e);
          }), this._clock.on("stop", t => {
            this.emit("stop", t);
          }), this._clock.on("pause", t => {
            this.emit("pause", t);
          });
        }
        get state() {
          return this._clock.getStateAtTime(this.now());
        }
        start(t, e) {
          let s;
          return this.context.resume(), undefined !== e && (s = this.toTicks(e)), this._clock.start(t, s), this;
        }
        stop(t) {
          return this._clock.stop(t), this;
        }
        pause(t) {
          return this._clock.pause(t), this;
        }
        toggle(t) {
          return t = this.toSeconds(t), "started" !== this._clock.getStateAtTime(t) ? this.start(t) : this.stop(t), this;
        }
        get timeSignature() {
          return this._timeSignature;
        }
        set timeSignature (t) {
          Array.isArray(t) && (t = t[0] / t[1] * 4), this._timeSignature = t;
        }
        get loopStart() {
          return new Zi(this.context, this._loopStart, "i").toSeconds();
        }
        set loopStart (t) {
          this._loopStart = this.toTicks(t);
        }
        get loopEnd() {
          return new Zi(this.context, this._loopEnd, "i").toSeconds();
        }
        set loopEnd (t) {
          this._loopEnd = this.toTicks(t);
        }
        get loop() {
          return this._loop.get(this.now());
        }
        set loop (t) {
          this._loop.set(t, this.now());
        }
        setLoopPoints(t, e) {
          return this.loopStart = t, this.loopEnd = e, this;
        }
        get swing() {
          return this._swingAmount;
        }
        set swing (t) {
          this._swingAmount = t;
        }
        get swingSubdivision() {
          return new Co(this.context, this._swingTicks).toNotation();
        }
        set swingSubdivision (t) {
          this._swingTicks = this.toTicks(t);
        }
        get position() {
          const t = this.now(), e = this._clock.getTicksAtTime(t);
          return new Co(this.context, e).toBarsBeatsSixteenths();
        }
        set position (t) {
          const e = this.toTicks(t);
          this.ticks = e;
        }
        get seconds() {
          return this._clock.seconds;
        }
        set seconds (t) {
          const e = this.now(), s = this._clock.frequency.timeToTicks(t, e);
          this.ticks = s;
        }
        get progress() {
          if (this.loop) {
            const t = this.now();
            return (this._clock.getTicksAtTime(t) - this._loopStart) / (this._loopEnd - this._loopStart);
          }
          return 0;
        }
        get ticks() {
          return this._clock.ticks;
        }
        set ticks (t) {
          if (this._clock.ticks !== t) {
            const e = this.now();
            if ("started" === this.state) {
              const s = this._clock.getTicksAtTime(e), n = e + this._clock.frequency.getDurationOfTicks(Math.ceil(s) - s, e);
              this.emit("stop", n), this._clock.setTicksAtTime(t, n), this.emit("start", n, this._clock.getSecondsAtTime(n));
            } else this.emit("ticks", e), this._clock.setTicksAtTime(t, e);
          }
        }
        getTicksAtTime(t) {
          return this._clock.getTicksAtTime(t);
        }
        getSecondsAtTime(t) {
          return this._clock.getSecondsAtTime(t);
        }
        get PPQ() {
          return this._clock.frequency.multiplier;
        }
        set PPQ (t) {
          this._clock.frequency.multiplier = t;
        }
        nextSubdivision(t) {
          if (t = this.toTicks(t), "started" !== this.state) return 0;
          {
            const e = this.now(), s = t - this.getTicksAtTime(e) % t;
            return this._clock.nextTickTime(s, e);
          }
        }
        syncSignal(t, e) {
          const s = this.now();
          let n = this.bpm, i = 1 / (60 / n.getValueAtTime(s) / this.PPQ), o = [];
          if ("time" === t.units) {
            const t = 0.015625 / i, e = new ho(t), s = new Fo(-1), r = new ho(t);
            n.chain(e, s, r), n = r, i = 1 / i, o = [e, s, r];
          }
          e || (e = 0 !== t.getValueAtTime(s) ? t.getValueAtTime(s) / i : 0);
          const r = new ho(e);
          return n.connect(r), r.connect(t._param), o.push(r), this._syncedSignals.push({initial: t.value, nodes: o, signal: t}), t.value = 0, this;
        }
        unsyncSignal(t) {
          for (let e = this._syncedSignals.length - 1; e >= 0; e--) {
            const s = this._syncedSignals[e];
            s.signal === t && (s.nodes.forEach(t => t.dispose()), s.signal.value = s.initial, this._syncedSignals.splice(e, 1));
          }
          return this;
        }
        dispose() {
          return super.dispose(), this._clock.dispose(), Mi(this, "bpm"), this._timeline.dispose(), this._repeatedEvents.dispose(), this;
        }
      }
      Ai.mixin(Po), Ti(t => {
        t.transport = new Po({context: t});
      }), ki(t => {
        t.transport.dispose();
      });
      class jo extends io {
        constructor(t) {
          super(t), this.input = undefined, this._state = new so("stopped"), this._synced = false, this._scheduled = [], this._syncedStart = Ei, this._syncedStop = Ei, this._state.memory = 100, this._state.increasing = true, this._volume = this.output = new xo({context: this.context, mute: t.mute, volume: t.volume}), this.volume = this._volume.volume, Di(this, "volume"), this.onstop = t.onstop;
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {mute: false, onstop: Ei, volume: 0});
        }
        get state() {
          return this._synced ? "started" === this.context.transport.state ? this._state.getValueAtTime(this.context.transport.seconds) : "stopped" : this._state.getValueAtTime(this.now());
        }
        get mute() {
          return this._volume.mute;
        }
        set mute (t) {
          this._volume.mute = t;
        }
        _clampToCurrentTime(t) {
          return this._synced ? t : Math.max(t, this.context.currentTime);
        }
        start(t, e, s) {
          let n = undefined === t && this._synced ? this.context.transport.seconds : this.toSeconds(t);
          if (n = this._clampToCurrentTime(n), this._synced || "started" !== this._state.getValueAtTime(n)) if (this.log("start", n), this._state.setStateAtTime("started", n), this._synced) {
            const t = this._state.get(n);
            t && (t.offset = this.toSeconds(pi(e, 0)), t.duration = s ? this.toSeconds(s) : undefined);
            const i = this.context.transport.schedule(t => {
              this._start(t, e, s);
            }, n);
            this._scheduled.push(i), "started" === this.context.transport.state && this.context.transport.getSecondsAtTime(this.immediate()) > n && this._syncedStart(this.now(), this.context.transport.seconds);
          } else Gn(this.context), this._start(n, e, s); else Bn(n > this._state.get(n).time + _i, "Start time must be strictly greater than previous start time"), this._state.cancel(n), this._state.setStateAtTime("started", n), this.log("restart", n), this.restart(n, e, s);
          return this;
        }
        stop(t) {
          let e = undefined === t && this._synced ? this.context.transport.seconds : this.toSeconds(t);
          if (e = this._clampToCurrentTime(e), "started" === this._state.getValueAtTime(e) || undefined !== this._state.getNextState("started", e)) {
            if (this.log("stop", e), this._synced) {
              const t = this.context.transport.schedule(this._stop.bind(this), e);
              this._scheduled.push(t);
            } else this._stop(e);
            this._state.cancel(e), this._state.setStateAtTime("stopped", e);
          }
          return this;
        }
        restart(t, e, s) {
          return t = this.toSeconds(t), "started" === this._state.getValueAtTime(t) && (this._state.cancel(t), this._restart(t, e, s)), this;
        }
        sync() {
          return this._synced || (this._synced = true, this._syncedStart = (t, e) => {
            if (e > 0 + _i) {
              const s = this._state.get(e);
              if (s && "started" === s.state && s.time !== e) {
                const n = e - this.toSeconds(s.time);
                let i;
                s.duration && (i = this.toSeconds(s.duration) - n), this._start(t, this.toSeconds(s.offset) + n, i);
              }
            }
          }, this._syncedStop = t => {
            const e = this.context.transport.getSecondsAtTime(Math.max(t - this.sampleTime, 0));
            "started" === this._state.getValueAtTime(e) && this._stop(t);
          }, this.context.transport.on("start", this._syncedStart), this.context.transport.on("loopStart", this._syncedStart), this.context.transport.on("stop", this._syncedStop), this.context.transport.on("pause", this._syncedStop), this.context.transport.on("loopEnd", this._syncedStop)), this;
        }
        unsync() {
          return this._synced && (this.context.transport.off("stop", this._syncedStop), this.context.transport.off("pause", this._syncedStop), this.context.transport.off("loopEnd", this._syncedStop), this.context.transport.off("start", this._syncedStart), this.context.transport.off("loopStart", this._syncedStart)), this._synced = false, this._scheduled.forEach(t => this.context.transport.clear(t)), this._scheduled = [], this._state.cancel(0), this._stop(0), this;
        }
        dispose() {
          return super.dispose(), this.onstop = Ei, this.unsync(), this._volume.dispose(), this._state.dispose(), this;
        }
      }
      class Lo extends lo {
        constructor() {
          const t = ui(Lo.getDefaults(), arguments, ["url", "onload"]);
          super(t), this.name = "ToneBufferSource", this._source = this.context.createBufferSource(), this._internalChannels = [this._source], this._sourceStarted = false, this._sourceStopped = false, ro(this._source, this._gainNode), this._source.onended = () => this._stopSource(), this.playbackRate = new no({context: this.context, param: this._source.playbackRate, units: "positive", value: t.playbackRate}), this.loop = t.loop, this.loopStart = t.loopStart, this.loopEnd = t.loopEnd, this._buffer = new Ri(t.url, t.onload, t.onerror), this._internalChannels.push(this._source);
        }
        static getDefaults() {
          return Object.assign(lo.getDefaults(), {url: new Ri, loop: false, loopEnd: 0, loopStart: 0, onload: Ei, onerror: Ei, playbackRate: 1});
        }
        get fadeIn() {
          return this._fadeIn;
        }
        set fadeIn (t) {
          this._fadeIn = t;
        }
        get fadeOut() {
          return this._fadeOut;
        }
        set fadeOut (t) {
          this._fadeOut = t;
        }
        get curve() {
          return this._curve;
        }
        set curve (t) {
          this._curve = t;
        }
        start(t, e, s, n = 1) {
          Bn(this.buffer.loaded, "buffer is either not set or not loaded");
          const i = this.toSeconds(t);
          this._startGain(i, n), e = this.loop ? pi(e, this.loopStart) : pi(e, 0);
          let o = Math.max(this.toSeconds(e), 0);
          if (this.loop) {
            const t = this.toSeconds(this.loopEnd) || this.buffer.duration, e = this.toSeconds(this.loopStart), s = t - e;
            (o > t + _i || Math.abs(o - t) < _i) && (o = (o - e) % s + e), Math.abs(o - this.buffer.duration) < _i && (o = 0);
          }
          if (this._source.buffer = this.buffer.get(), this._source.loopEnd = this.toSeconds(this.loopEnd) || this.buffer.duration, o + _i < this.buffer.duration && (this._sourceStarted = true, this._source.start(i, o)), undefined !== s) {
            let t = this.toSeconds(s);
            t = Math.max(t, 0), this.stop(i + t);
          }
          return this;
        }
        _stopSource(t) {
          !this._sourceStopped && this._sourceStarted && (this._sourceStopped = true, this._source.stop(this.toSeconds(t)), this._onended());
        }
        get loopStart() {
          return this._source.loopStart;
        }
        set loopStart (t) {
          this._source.loopStart = this.toSeconds(t);
        }
        get loopEnd() {
          return this._source.loopEnd;
        }
        set loopEnd (t) {
          this._source.loopEnd = this.toSeconds(t);
        }
        get buffer() {
          return this._buffer;
        }
        set buffer (t) {
          this._buffer.set(t);
        }
        get loop() {
          return this._source.loop;
        }
        set loop (t) {
          this._source.loop = t, this._sourceStarted && this.cancelStop();
        }
        dispose() {
          return super.dispose(), this._source.onended = null, this._source.disconnect(), this._buffer.dispose(), this.playbackRate.dispose(), this;
        }
      }
      class zo extends jo {
        constructor() {
          const t = ui(zo.getDefaults(), arguments, ["type"]);
          super(t), this.name = "Noise", this._source = null, this._playbackRate = t.playbackRate, this.type = t.type, this._fadeIn = t.fadeIn, this._fadeOut = t.fadeOut;
        }
        static getDefaults() {
          return Object.assign(jo.getDefaults(), {fadeIn: 0, fadeOut: 0, playbackRate: 1, type: "white"});
        }
        get type() {
          return this._type;
        }
        set type (t) {
          if (Bn(t in Uo, "Noise: invalid type: " + t), this._type !== t && (this._type = t, "started" === this.state)) {
            const t = this.now();
            this._stop(t), this._start(t);
          }
        }
        get playbackRate() {
          return this._playbackRate;
        }
        set playbackRate (t) {
          this._playbackRate = t, this._source && (this._source.playbackRate.value = t);
        }
        _start(t) {
          const e = Uo[this._type];
          this._source = new Lo({url: e, context: this.context, fadeIn: this._fadeIn, fadeOut: this._fadeOut, loop: true, onended: () => this.onstop(this), playbackRate: this._playbackRate}).connect(this.output), this._source.start(this.toSeconds(t), Math.random() * (e.duration - 0.001));
        }
        _stop(t) {
          this._source && (this._source.stop(this.toSeconds(t)), this._source = null);
        }
        get fadeIn() {
          return this._fadeIn;
        }
        set fadeIn (t) {
          this._fadeIn = t, this._source && (this._source.fadeIn = this._fadeIn);
        }
        get fadeOut() {
          return this._fadeOut;
        }
        set fadeOut (t) {
          this._fadeOut = t, this._source && (this._source.fadeOut = this._fadeOut);
        }
        _restart(t) {
          this._stop(t), this._start(t);
        }
        dispose() {
          return super.dispose(), this._source && this._source.disconnect(), this;
        }
      }
      const Wo = 220500, Bo = {brown: null, pink: null, white: null}, Uo = {get brown() {
        if (!Bo.brown) {
          const t = [];
          for (let e = 0; e < 2; e++) {
            const s = new Float32Array(Wo);
            t[e] = s;
            let n = 0;
            for (let t = 0; t < Wo; t++) {
              const e = 2 * Math.random() - 1;
              s[t] = (n + 0.02 * e) / 1.02, n = s[t], s[t] *= 3.5;
            }
          }
          Bo.brown = (new Ri).fromArray(t);
        }
        return Bo.brown;
      }, get pink() {
        if (!Bo.pink) {
          const t = [];
          for (let e = 0; e < 2; e++) {
            const s = new Float32Array(Wo);
            let n, i, o, r, a, c, h;
            t[e] = s, n = i = o = r = a = c = h = 0;
            for (let t = 0; t < Wo; t++) {
              const e = 2 * Math.random() - 1;
              n = 0.99886 * n + 0.0555179 * e, i = 0.99332 * i + 0.0750759 * e, o = 0.969 * o + 0.153852 * e, r = 0.8665 * r + 0.3104856 * e, a = 0.55 * a + 0.5329522 * e, c = -0.7616 * c - 0.016898 * e, s[t] = n + i + o + r + a + c + h + 0.5362 * e, s[t] *= 0.11, h = 0.115926 * e;
            }
          }
          Bo.pink = (new Ri).fromArray(t);
        }
        return Bo.pink;
      }, get white() {
        if (!Bo.white) {
          const t = [];
          for (let e = 0; e < 2; e++) {
            const s = new Float32Array(Wo);
            t[e] = s;
            for (let t = 0; t < Wo; t++) s[t] = 2 * Math.random() - 1;
          }
          Bo.white = (new Ri).fromArray(t);
        }
        return Bo.white;
      }};
      class Go extends io {
        constructor() {
          const t = ui(Go.getDefaults(), arguments, ["volume"]);
          super(t), this.name = "UserMedia", this._volume = this.output = new xo({context: this.context, volume: t.volume}), this.volume = this._volume.volume, Di(this, "volume"), this.mute = t.mute;
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {mute: false, volume: 0});
        }
        open(t) {
          return ni(this, undefined, undefined, function* () {
            Bn(Go.supported, "UserMedia is not supported"), "started" === this.state && this.close();
            const e = yield Go.enumerateDevices();
            "number" == typeof t ? this._device = e[t] : (this._device = e.find(e => e.label === t || e.deviceId === t), !this._device && e.length > 0 && (this._device = e[0]), Bn(undefined !== this._device, `No matching device ${t}`));
            const s = {audio: {echoCancellation: false, sampleRate: this.context.sampleRate, noiseSuppression: false, mozNoiseSuppression: false}};
            this._device && (s.audio.deviceId = this._device.deviceId);
            const n = yield navigator.mediaDevices.getUserMedia(s);
            if (!this._stream) {
              this._stream = n;
              const t = this.context.createMediaStreamSource(n);
              ro(t, this.output), this._mediaStream = t;
            }
            return this;
          });
        }
        close() {
          return this._stream && this._mediaStream && (this._stream.getAudioTracks().forEach(t => {
            t.stop();
          }), this._stream = undefined, this._mediaStream.disconnect(), this._mediaStream = undefined), this._device = undefined, this;
        }
        static enumerateDevices() {
          return ni(this, undefined, undefined, function* () {
            return (yield navigator.mediaDevices.enumerateDevices()).filter(t => "audioinput" === t.kind);
          });
        }
        get state() {
          return this._stream && this._stream.active ? "started" : "stopped";
        }
        get deviceId() {
          return this._device ? this._device.deviceId : undefined;
        }
        get groupId() {
          return this._device ? this._device.groupId : undefined;
        }
        get label() {
          return this._device ? this._device.label : undefined;
        }
        get mute() {
          return this._volume.mute;
        }
        set mute (t) {
          this._volume.mute = t;
        }
        dispose() {
          return super.dispose(), this.close(), this._volume.dispose(), this.volume.dispose(), this;
        }
        static get supported() {
          return undefined !== navigator.mediaDevices && undefined !== navigator.mediaDevices.getUserMedia;
        }
      }
      function Qo(t, e) {
        return ni(this, undefined, undefined, function* () {
          const s = e / t.context.sampleRate, n = new qi(1, s, t.context.sampleRate);
          return new t.constructor(Object.assign(t.get(), {frequency: 2 / s, detune: 0, context: n})).toDestination().start(0), (yield n.render()).getChannelData(0);
        });
      }
      class Zo extends lo {
        constructor() {
          const t = ui(Zo.getDefaults(), arguments, ["frequency", "type"]);
          super(t), this.name = "ToneOscillatorNode", this._oscillator = this.context.createOscillator(), this._internalChannels = [this._oscillator], ro(this._oscillator, this._gainNode), this.type = t.type, this.frequency = new no({context: this.context, param: this._oscillator.frequency, units: "frequency", value: t.frequency}), this.detune = new no({context: this.context, param: this._oscillator.detune, units: "cents", value: t.detune}), Di(this, ["frequency", "detune"]);
        }
        static getDefaults() {
          return Object.assign(lo.getDefaults(), {detune: 0, frequency: 440, type: "sine"});
        }
        start(t) {
          const e = this.toSeconds(t);
          return this.log("start", e), this._startGain(e), this._oscillator.start(e), this;
        }
        _stopSource(t) {
          this._oscillator.stop(t);
        }
        setPeriodicWave(t) {
          return this._oscillator.setPeriodicWave(t), this;
        }
        get type() {
          return this._oscillator.type;
        }
        set type (t) {
          this._oscillator.type = t;
        }
        dispose() {
          return super.dispose(), "started" === this.state && this.stop(), this._oscillator.disconnect(), this.frequency.dispose(), this.detune.dispose(), this;
        }
      }
      class Xo extends jo {
        constructor() {
          const t = ui(Xo.getDefaults(), arguments, ["frequency", "type"]);
          super(t), this.name = "Oscillator", this._oscillator = null, this.frequency = new po({context: this.context, units: "frequency", value: t.frequency}), Di(this, "frequency"), this.detune = new po({context: this.context, units: "cents", value: t.detune}), Di(this, "detune"), this._partials = t.partials, this._partialCount = t.partialCount, this._type = t.type, t.partialCount && "custom" !== t.type && (this._type = this.baseType + t.partialCount.toString()), this.phase = t.phase;
        }
        static getDefaults() {
          return Object.assign(jo.getDefaults(), {detune: 0, frequency: 440, partialCount: 0, partials: [], phase: 0, type: "sine"});
        }
        _start(t) {
          const e = this.toSeconds(t), s = new Zo({context: this.context, onended: () => this.onstop(this)});
          this._oscillator = s, this._wave ? this._oscillator.setPeriodicWave(this._wave) : this._oscillator.type = this._type, this._oscillator.connect(this.output), this.frequency.connect(this._oscillator.frequency), this.detune.connect(this._oscillator.detune), this._oscillator.start(e);
        }
        _stop(t) {
          const e = this.toSeconds(t);
          this._oscillator && this._oscillator.stop(e);
        }
        _restart(t) {
          const e = this.toSeconds(t);
          return this.log("restart", e), this._oscillator && this._oscillator.cancelStop(), this._state.cancel(e), this;
        }
        syncFrequency() {
          return this.context.transport.syncSignal(this.frequency), this;
        }
        unsyncFrequency() {
          return this.context.transport.unsyncSignal(this.frequency), this;
        }
        _getCachedPeriodicWave() {
          if ("custom" === this._type) return Xo._periodicWaveCache.find(t => {
            return t.phase === this._phase && (e = t.partials, s = this._partials, e.length === s.length && e.every((t, e) => s[e] === t));
            var e, s;
          });
          {
            const t = Xo._periodicWaveCache.find(t => t.type === this._type && t.phase === this._phase);
            return this._partialCount = t ? t.partialCount : this._partialCount, t;
          }
        }
        get type() {
          return this._type;
        }
        set type (t) {
          this._type = t;
          const e = -1 !== ["sine", "square", "sawtooth", "triangle"].indexOf(t);
          if (0 === this._phase && e) this._wave = undefined, this._partialCount = 0, null !== this._oscillator && (this._oscillator.type = t); else {
            const e = this._getCachedPeriodicWave();
            if (undefined !== e) {
              const {partials: t, wave: s} = e;
              this._wave = s, this._partials = t, null !== this._oscillator && this._oscillator.setPeriodicWave(this._wave);
            } else {
              const [e, s] = this._getRealImaginary(t, this._phase), n = this.context.createPeriodicWave(e, s);
              this._wave = n, null !== this._oscillator && this._oscillator.setPeriodicWave(this._wave), Xo._periodicWaveCache.push({imag: s, partialCount: this._partialCount, partials: this._partials, phase: this._phase, real: e, type: this._type, wave: this._wave}), Xo._periodicWaveCache.length > 100 && Xo._periodicWaveCache.shift();
            }
          }
        }
        get baseType() {
          return this._type.replace(this.partialCount.toString(), "");
        }
        set baseType (t) {
          this.partialCount && "custom" !== this._type && "custom" !== t ? this.type = t + this.partialCount : this.type = t;
        }
        get partialCount() {
          return this._partialCount;
        }
        set partialCount (t) {
          Un(t, 0);
          let e = this._type;
          const s = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);
          if (s && (e = s[1]), "custom" !== this._type) this.type = 0 === t ? e : e + t.toString(); else {
            const e = new Float32Array(t);
            this._partials.forEach((t, s) => e[s] = t), this._partials = Array.from(e), this.type = this._type;
          }
        }
        _getRealImaginary(t, e) {
          let s = 2048;
          const n = new Float32Array(s), i = new Float32Array(s);
          let o = 1;
          if ("custom" === t) {
            if (o = this._partials.length + 1, this._partialCount = this._partials.length, s = o, 0 === this._partials.length) return [n, i];
          } else {
            const e = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(t);
            e ? (o = parseInt(e[2], 10) + 1, this._partialCount = parseInt(e[2], 10), t = e[1], o = Math.max(o, 2), s = o) : this._partialCount = 0, this._partials = [];
          }
          for (let r = 1; r < s; ++r) {
            const s = 2 / (r * Math.PI);
            let a;
            switch (t) {
              case "sine":
                a = r <= o ? 1 : 0, this._partials[r - 1] = a;
                break;
              case "square":
                a = 1 & r ? 2 * s : 0, this._partials[r - 1] = a;
                break;
              case "sawtooth":
                a = s * (1 & r ? 1 : -1), this._partials[r - 1] = a;
                break;
              case "triangle":
                a = 1 & r ? s * s * 2 * (r - 1 >> 1 & 1 ? -1 : 1) : 0, this._partials[r - 1] = a;
                break;
              case "custom":
                a = this._partials[r - 1];
                break;
              default:
                throw new TypeError("Oscillator: invalid type: " + t);
            }
            0 !== a ? (n[r] = -a * Math.sin(e * r), i[r] = a * Math.cos(e * r)) : (n[r] = 0, i[r] = 0);
          }
          return [n, i];
        }
        _inverseFFT(t, e, s) {
          let n = 0;
          const i = t.length;
          for (let o = 0; o < i; o++) n += t[o] * Math.cos(o * s) + e[o] * Math.sin(o * s);
          return n;
        }
        getInitialValue() {
          const [t, e] = this._getRealImaginary(this._type, 0);
          let s = 0;
          const n = 2 * Math.PI;
          for (let i = 0; i < 32; i++) s = Math.max(this._inverseFFT(t, e, i / 32 * n), s);
          return Math.max(Math.min(-this._inverseFFT(t, e, this._phase) / s, 1), -1);
        }
        get partials() {
          return this._partials.slice(0, this.partialCount);
        }
        set partials (t) {
          this._partials = t, this._partialCount = this._partials.length, t.length && (this.type = "custom");
        }
        get phase() {
          return this._phase * (180 / Math.PI);
        }
        set phase (t) {
          this._phase = t * Math.PI / 180, this.type = this._type;
        }
        asArray() {
          return ni(this, arguments, undefined, function* (t = 1024) {
            return Qo(this, t);
          });
        }
        dispose() {
          return super.dispose(), null !== this._oscillator && this._oscillator.dispose(), this._wave = undefined, this.frequency.dispose(), this.detune.dispose(), this;
        }
      }
      Xo._periodicWaveCache = [];
      class Yo extends qo {
        constructor() {
          super(...arguments), this.name = "AudioToGain", this._norm = new Io({context: this.context, mapping: t => (t + 1) / 2}), this.input = this._norm, this.output = this._norm;
        }
        dispose() {
          return super.dispose(), this._norm.dispose(), this;
        }
      }
      class $o extends po {
        constructor() {
          const t = ui($o.getDefaults(), arguments, ["value"]);
          super(t), this.name = "Multiply", this.override = false, this._mult = this.input = this.output = new ho({context: this.context, minValue: t.minValue, maxValue: t.maxValue}), this.factor = this._param = this._mult.gain, this.factor.setValueAtTime(t.value, 0);
        }
        static getDefaults() {
          return Object.assign(po.getDefaults(), {value: 0});
        }
        dispose() {
          return super.dispose(), this._mult.dispose(), this;
        }
      }
      class Ho extends jo {
        constructor() {
          const t = ui(Ho.getDefaults(), arguments, ["frequency", "type", "modulationType"]);
          super(t), this.name = "AMOscillator", this._modulationScale = new Yo({context: this.context}), this._modulationNode = new ho({context: this.context}), this._carrier = new Xo({context: this.context, detune: t.detune, frequency: t.frequency, onstop: () => this.onstop(this), phase: t.phase, type: t.type}), this.frequency = this._carrier.frequency, this.detune = this._carrier.detune, this._modulator = new Xo({context: this.context, phase: t.phase, type: t.modulationType}), this.harmonicity = new $o({context: this.context, units: "positive", value: t.harmonicity}), this.frequency.chain(this.harmonicity, this._modulator.frequency), this._modulator.chain(this._modulationScale, this._modulationNode.gain), this._carrier.chain(this._modulationNode, this.output), Di(this, ["frequency", "detune", "harmonicity"]);
        }
        static getDefaults() {
          return Object.assign(Xo.getDefaults(), {harmonicity: 1, modulationType: "square"});
        }
        _start(t) {
          this._modulator.start(t), this._carrier.start(t);
        }
        _stop(t) {
          this._modulator.stop(t), this._carrier.stop(t);
        }
        _restart(t) {
          this._modulator.restart(t), this._carrier.restart(t);
        }
        get type() {
          return this._carrier.type;
        }
        set type (t) {
          this._carrier.type = t;
        }
        get baseType() {
          return this._carrier.baseType;
        }
        set baseType (t) {
          this._carrier.baseType = t;
        }
        get partialCount() {
          return this._carrier.partialCount;
        }
        set partialCount (t) {
          this._carrier.partialCount = t;
        }
        get modulationType() {
          return this._modulator.type;
        }
        set modulationType (t) {
          this._modulator.type = t;
        }
        get phase() {
          return this._carrier.phase;
        }
        set phase (t) {
          this._carrier.phase = t, this._modulator.phase = t;
        }
        get partials() {
          return this._carrier.partials;
        }
        set partials (t) {
          this._carrier.partials = t;
        }
        asArray() {
          return ni(this, arguments, undefined, function* (t = 1024) {
            return Qo(this, t);
          });
        }
        dispose() {
          return super.dispose(), this.frequency.dispose(), this.detune.dispose(), this.harmonicity.dispose(), this._carrier.dispose(), this._modulator.dispose(), this._modulationNode.dispose(), this._modulationScale.dispose(), this;
        }
      }
      class Jo extends jo {
        constructor() {
          const t = ui(Jo.getDefaults(), arguments, ["frequency", "type", "modulationType"]);
          super(t), this.name = "FMOscillator", this._modulationNode = new ho({context: this.context, gain: 0}), this._carrier = new Xo({context: this.context, detune: t.detune, frequency: 0, onstop: () => this.onstop(this), phase: t.phase, type: t.type}), this.detune = this._carrier.detune, this.frequency = new po({context: this.context, units: "frequency", value: t.frequency}), this._modulator = new Xo({context: this.context, phase: t.phase, type: t.modulationType}), this.harmonicity = new $o({context: this.context, units: "positive", value: t.harmonicity}), this.modulationIndex = new $o({context: this.context, units: "positive", value: t.modulationIndex}), this.frequency.connect(this._carrier.frequency), this.frequency.chain(this.harmonicity, this._modulator.frequency), this.frequency.chain(this.modulationIndex, this._modulationNode), this._modulator.connect(this._modulationNode.gain), this._modulationNode.connect(this._carrier.frequency), this._carrier.connect(this.output), this.detune.connect(this._modulator.detune), Di(this, ["modulationIndex", "frequency", "detune", "harmonicity"]);
        }
        static getDefaults() {
          return Object.assign(Xo.getDefaults(), {harmonicity: 1, modulationIndex: 2, modulationType: "square"});
        }
        _start(t) {
          this._modulator.start(t), this._carrier.start(t);
        }
        _stop(t) {
          this._modulator.stop(t), this._carrier.stop(t);
        }
        _restart(t) {
          return this._modulator.restart(t), this._carrier.restart(t), this;
        }
        get type() {
          return this._carrier.type;
        }
        set type (t) {
          this._carrier.type = t;
        }
        get baseType() {
          return this._carrier.baseType;
        }
        set baseType (t) {
          this._carrier.baseType = t;
        }
        get partialCount() {
          return this._carrier.partialCount;
        }
        set partialCount (t) {
          this._carrier.partialCount = t;
        }
        get modulationType() {
          return this._modulator.type;
        }
        set modulationType (t) {
          this._modulator.type = t;
        }
        get phase() {
          return this._carrier.phase;
        }
        set phase (t) {
          this._carrier.phase = t, this._modulator.phase = t;
        }
        get partials() {
          return this._carrier.partials;
        }
        set partials (t) {
          this._carrier.partials = t;
        }
        asArray() {
          return ni(this, arguments, undefined, function* (t = 1024) {
            return Qo(this, t);
          });
        }
        dispose() {
          return super.dispose(), this.frequency.dispose(), this.harmonicity.dispose(), this._carrier.dispose(), this._modulator.dispose(), this._modulationNode.dispose(), this.modulationIndex.dispose(), this;
        }
      }
      class Ko extends jo {
        constructor() {
          const t = ui(Ko.getDefaults(), arguments, ["frequency", "width"]);
          super(t), this.name = "PulseOscillator", this._widthGate = new ho({context: this.context, gain: 0}), this._thresh = new Io({context: this.context, mapping: t => t <= 0 ? -1 : 1}), this.width = new po({context: this.context, units: "audioRange", value: t.width}), this._triangle = new Xo({context: this.context, detune: t.detune, frequency: t.frequency, onstop: () => this.onstop(this), phase: t.phase, type: "triangle"}), this.frequency = this._triangle.frequency, this.detune = this._triangle.detune, this._triangle.chain(this._thresh, this.output), this.width.chain(this._widthGate, this._thresh), Di(this, ["width", "frequency", "detune"]);
        }
        static getDefaults() {
          return Object.assign(jo.getDefaults(), {detune: 0, frequency: 440, phase: 0, type: "pulse", width: 0.2});
        }
        _start(t) {
          t = this.toSeconds(t), this._triangle.start(t), this._widthGate.gain.setValueAtTime(1, t);
        }
        _stop(t) {
          t = this.toSeconds(t), this._triangle.stop(t), this._widthGate.gain.cancelScheduledValues(t), this._widthGate.gain.setValueAtTime(0, t);
        }
        _restart(t) {
          this._triangle.restart(t), this._widthGate.gain.cancelScheduledValues(t), this._widthGate.gain.setValueAtTime(1, t);
        }
        get phase() {
          return this._triangle.phase;
        }
        set phase (t) {
          this._triangle.phase = t;
        }
        get type() {
          return "pulse";
        }
        get baseType() {
          return "pulse";
        }
        get partials() {
          return [];
        }
        get partialCount() {
          return 0;
        }
        set carrierType (t) {
          this._triangle.type = t;
        }
        asArray() {
          return ni(this, arguments, undefined, function* (t = 1024) {
            return Qo(this, t);
          });
        }
        dispose() {
          return super.dispose(), this._triangle.dispose(), this.width.dispose(), this._widthGate.dispose(), this._thresh.dispose(), this;
        }
      }
      class tr extends jo {
        constructor() {
          const t = ui(tr.getDefaults(), arguments, ["frequency", "type", "spread"]);
          super(t), this.name = "FatOscillator", this._oscillators = [], this.frequency = new po({context: this.context, units: "frequency", value: t.frequency}), this.detune = new po({context: this.context, units: "cents", value: t.detune}), this._spread = t.spread, this._type = t.type, this._phase = t.phase, this._partials = t.partials, this._partialCount = t.partialCount, this.count = t.count, Di(this, ["frequency", "detune"]);
        }
        static getDefaults() {
          return Object.assign(Xo.getDefaults(), {count: 3, spread: 20, type: "sawtooth"});
        }
        _start(t) {
          t = this.toSeconds(t), this._forEach(e => e.start(t));
        }
        _stop(t) {
          t = this.toSeconds(t), this._forEach(e => e.stop(t));
        }
        _restart(t) {
          this._forEach(e => e.restart(t));
        }
        _forEach(t) {
          for (let e = 0; e < this._oscillators.length; e++) t(this._oscillators[e], e);
        }
        get type() {
          return this._type;
        }
        set type (t) {
          this._type = t, this._forEach(e => e.type = t);
        }
        get spread() {
          return this._spread;
        }
        set spread (t) {
          if (this._spread = t, this._oscillators.length > 1) {
            const e = -t / 2, s = t / (this._oscillators.length - 1);
            this._forEach((t, n) => t.detune.value = e + s * n);
          }
        }
        get count() {
          return this._oscillators.length;
        }
        set count (t) {
          if (Un(t, 1), this._oscillators.length !== t) {
            this._forEach(t => t.dispose()), this._oscillators = [];
            for (let e = 0; e < t; e++) {
              const s = new Xo({context: this.context, volume: -6 - 1.1 * t, type: this._type, phase: this._phase + e / t * 360, partialCount: this._partialCount, onstop: 0 === e ? () => this.onstop(this) : Ei});
              "custom" === this.type && (s.partials = this._partials), this.frequency.connect(s.frequency), this.detune.connect(s.detune), s.detune.overridden = false, s.connect(this.output), this._oscillators[e] = s;
            }
            this.spread = this._spread, "started" === this.state && this._forEach(t => t.start());
          }
        }
        get phase() {
          return this._phase;
        }
        set phase (t) {
          this._phase = t, this._forEach((t, e) => t.phase = this._phase + e / this.count * 360);
        }
        get baseType() {
          return this._oscillators[0].baseType;
        }
        set baseType (t) {
          this._forEach(e => e.baseType = t), this._type = this._oscillators[0].type;
        }
        get partials() {
          return this._oscillators[0].partials;
        }
        set partials (t) {
          this._partials = t, this._partialCount = this._partials.length, t.length && (this._type = "custom", this._forEach(e => e.partials = t));
        }
        get partialCount() {
          return this._oscillators[0].partialCount;
        }
        set partialCount (t) {
          this._partialCount = t, this._forEach(e => e.partialCount = t), this._type = this._oscillators[0].type;
        }
        asArray() {
          return ni(this, arguments, undefined, function* (t = 1024) {
            return Qo(this, t);
          });
        }
        dispose() {
          return super.dispose(), this.frequency.dispose(), this.detune.dispose(), this._forEach(t => t.dispose()), this;
        }
      }
      class er extends jo {
        constructor() {
          const t = ui(er.getDefaults(), arguments, ["frequency", "modulationFrequency"]);
          super(t), this.name = "PWMOscillator", this.sourceType = "pwm", this._scale = new $o({context: this.context, value: 2}), this._pulse = new Ko({context: this.context, frequency: t.modulationFrequency}), this._pulse.carrierType = "sine", this.modulationFrequency = this._pulse.frequency, this._modulator = new Xo({context: this.context, detune: t.detune, frequency: t.frequency, onstop: () => this.onstop(this), phase: t.phase}), this.frequency = this._modulator.frequency, this.detune = this._modulator.detune, this._modulator.chain(this._scale, this._pulse.width), this._pulse.connect(this.output), Di(this, ["modulationFrequency", "frequency", "detune"]);
        }
        static getDefaults() {
          return Object.assign(jo.getDefaults(), {detune: 0, frequency: 440, modulationFrequency: 0.4, phase: 0, type: "pwm"});
        }
        _start(t) {
          t = this.toSeconds(t), this._modulator.start(t), this._pulse.start(t);
        }
        _stop(t) {
          t = this.toSeconds(t), this._modulator.stop(t), this._pulse.stop(t);
        }
        _restart(t) {
          this._modulator.restart(t), this._pulse.restart(t);
        }
        get type() {
          return "pwm";
        }
        get baseType() {
          return "pwm";
        }
        get partials() {
          return [];
        }
        get partialCount() {
          return 0;
        }
        get phase() {
          return this._modulator.phase;
        }
        set phase (t) {
          this._modulator.phase = t;
        }
        asArray() {
          return ni(this, arguments, undefined, function* (t = 1024) {
            return Qo(this, t);
          });
        }
        dispose() {
          return super.dispose(), this._pulse.dispose(), this._scale.dispose(), this._modulator.dispose(), this;
        }
      }
      const sr = {am: Ho, fat: tr, fm: Jo, oscillator: Xo, pulse: Ko, pwm: er};
      class nr extends jo {
        constructor() {
          const t = ui(nr.getDefaults(), arguments, ["frequency", "type"]);
          super(t), this.name = "OmniOscillator", this.frequency = new po({context: this.context, units: "frequency", value: t.frequency}), this.detune = new po({context: this.context, units: "cents", value: t.detune}), Di(this, ["frequency", "detune"]), this.set(t);
        }
        static getDefaults() {
          return Object.assign(Xo.getDefaults(), Jo.getDefaults(), Ho.getDefaults(), tr.getDefaults(), Ko.getDefaults(), er.getDefaults());
        }
        _start(t) {
          this._oscillator.start(t);
        }
        _stop(t) {
          this._oscillator.stop(t);
        }
        _restart(t) {
          return this._oscillator.restart(t), this;
        }
        get type() {
          let t = "";
          return ["am", "fm", "fat"].some(t => this._sourceType === t) && (t = this._sourceType), t + this._oscillator.type;
        }
        set type (t) {
          "fm" === t.substr(0, 2) ? (this._createNewOscillator("fm"), this._oscillator = this._oscillator, this._oscillator.type = t.substr(2)) : "am" === t.substr(0, 2) ? (this._createNewOscillator("am"), this._oscillator = this._oscillator, this._oscillator.type = t.substr(2)) : "fat" === t.substr(0, 3) ? (this._createNewOscillator("fat"), this._oscillator = this._oscillator, this._oscillator.type = t.substr(3)) : "pwm" === t ? (this._createNewOscillator("pwm"), this._oscillator = this._oscillator) : "pulse" === t ? this._createNewOscillator("pulse") : (this._createNewOscillator("oscillator"), this._oscillator = this._oscillator, this._oscillator.type = t);
        }
        get partials() {
          return this._oscillator.partials;
        }
        set partials (t) {
          this._getOscType(this._oscillator, "pulse") || this._getOscType(this._oscillator, "pwm") || (this._oscillator.partials = t);
        }
        get partialCount() {
          return this._oscillator.partialCount;
        }
        set partialCount (t) {
          this._getOscType(this._oscillator, "pulse") || this._getOscType(this._oscillator, "pwm") || (this._oscillator.partialCount = t);
        }
        set(t) {
          return Reflect.has(t, "type") && t.type && (this.type = t.type), super.set(t), this;
        }
        _createNewOscillator(t) {
          if (t !== this._sourceType) {
            this._sourceType = t;
            const e = sr[t], s = this.now();
            if (this._oscillator) {
              const t = this._oscillator;
              t.stop(s), this.context.setTimeout(() => t.dispose(), this.blockTime);
            }
            this._oscillator = new e({context: this.context}), this.frequency.connect(this._oscillator.frequency), this.detune.connect(this._oscillator.detune), this._oscillator.connect(this.output), this._oscillator.onstop = () => this.onstop(this), "started" === this.state && this._oscillator.start(s);
          }
        }
        get phase() {
          return this._oscillator.phase;
        }
        set phase (t) {
          this._oscillator.phase = t;
        }
        get sourceType() {
          return this._sourceType;
        }
        set sourceType (t) {
          let e = "sine";
          "pwm" !== this._oscillator.type && "pulse" !== this._oscillator.type && (e = this._oscillator.type), "fm" === t ? this.type = "fm" + e : "am" === t ? this.type = "am" + e : "fat" === t ? this.type = "fat" + e : "oscillator" === t ? this.type = e : "pulse" === t ? this.type = "pulse" : "pwm" === t && (this.type = "pwm");
        }
        _getOscType(t, e) {
          return t instanceof sr[e];
        }
        get baseType() {
          return this._oscillator.baseType;
        }
        set baseType (t) {
          this._getOscType(this._oscillator, "pulse") || this._getOscType(this._oscillator, "pwm") || "pulse" === t || "pwm" === t || (this._oscillator.baseType = t);
        }
        get width() {
          return this._getOscType(this._oscillator, "pulse") ? this._oscillator.width : undefined;
        }
        get count() {
          return this._getOscType(this._oscillator, "fat") ? this._oscillator.count : undefined;
        }
        set count (t) {
          this._getOscType(this._oscillator, "fat") && "number" == typeof t && (this._oscillator.count = t);
        }
        get spread() {
          return this._getOscType(this._oscillator, "fat") ? this._oscillator.spread : undefined;
        }
        set spread (t) {
          this._getOscType(this._oscillator, "fat") && "number" == typeof t && (this._oscillator.spread = t);
        }
        get modulationType() {
          return this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am") ? this._oscillator.modulationType : undefined;
        }
        set modulationType (t) {
          (this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am")) && "string" == typeof t && (this._oscillator.modulationType = t);
        }
        get modulationIndex() {
          return this._getOscType(this._oscillator, "fm") ? this._oscillator.modulationIndex : undefined;
        }
        get harmonicity() {
          return this._getOscType(this._oscillator, "fm") || this._getOscType(this._oscillator, "am") ? this._oscillator.harmonicity : undefined;
        }
        get modulationFrequency() {
          return this._getOscType(this._oscillator, "pwm") ? this._oscillator.modulationFrequency : undefined;
        }
        asArray() {
          return ni(this, arguments, undefined, function* (t = 1024) {
            return Qo(this, t);
          });
        }
        dispose() {
          return super.dispose(), this.detune.dispose(), this.frequency.dispose(), this._oscillator.dispose(), this;
        }
      }
      class ir extends po {
        constructor() {
          super(ui(ir.getDefaults(), arguments, ["value"])), this.override = false, this.name = "Add", this._sum = new ho({context: this.context}), this.input = this._sum, this.output = this._sum, this.addend = this._param, oo(this._constantSource, this._sum);
        }
        static getDefaults() {
          return Object.assign(po.getDefaults(), {value: 0});
        }
        dispose() {
          return super.dispose(), this._sum.dispose(), this;
        }
      }
      class or extends qo {
        constructor() {
          const t = ui(or.getDefaults(), arguments, ["min", "max"]);
          super(t), this.name = "Scale", this._mult = this.input = new $o({context: this.context, value: t.max - t.min}), this._add = this.output = new ir({context: this.context, value: t.min}), this._min = t.min, this._max = t.max, this.input.connect(this.output);
        }
        static getDefaults() {
          return Object.assign(qo.getDefaults(), {max: 1, min: 0});
        }
        get min() {
          return this._min;
        }
        set min (t) {
          this._min = t, this._setRange();
        }
        get max() {
          return this._max;
        }
        set max (t) {
          this._max = t, this._setRange();
        }
        _setRange() {
          this._add.value = this._min, this._mult.value = this._max - this._min;
        }
        dispose() {
          return super.dispose(), this._add.dispose(), this._mult.dispose(), this;
        }
      }
      class rr extends qo {
        constructor() {
          super(ui(rr.getDefaults(), arguments)), this.name = "Zero", this._gain = new ho({context: this.context}), this.output = this._gain, this.input = undefined, ro(this.context.getConstant(0), this._gain);
        }
        dispose() {
          return super.dispose(), ao(this.context.getConstant(0), this._gain), this;
        }
      }
      class ar extends io {
        constructor() {
          const t = ui(ar.getDefaults(), arguments, ["frequency", "min", "max"]);
          super(t), this.name = "LFO", this._stoppedValue = 0, this._units = "number", this.convert = true, this._fromType = no.prototype._fromType, this._toType = no.prototype._toType, this._is = no.prototype._is, this._clampValue = no.prototype._clampValue, this._oscillator = new Xo(t), this.frequency = this._oscillator.frequency, this._amplitudeGain = new ho({context: this.context, gain: t.amplitude, units: "normalRange"}), this.amplitude = this._amplitudeGain.gain, this._stoppedSignal = new po({context: this.context, units: "audioRange", value: 0}), this._zeros = new rr({context: this.context}), this._a2g = new Yo({context: this.context}), this._scaler = this.output = new or({context: this.context, max: t.max, min: t.min}), this.units = t.units, this.min = t.min, this.max = t.max, this._oscillator.chain(this._amplitudeGain, this._a2g, this._scaler), this._zeros.connect(this._a2g), this._stoppedSignal.connect(this._a2g), Di(this, ["amplitude", "frequency"]), this.phase = t.phase;
        }
        static getDefaults() {
          return Object.assign(Xo.getDefaults(), {amplitude: 1, frequency: "4n", max: 1, min: 0, type: "sine", units: "number"});
        }
        start(t) {
          return t = this.toSeconds(t), this._stoppedSignal.setValueAtTime(0, t), this._oscillator.start(t), this;
        }
        stop(t) {
          return t = this.toSeconds(t), this._stoppedSignal.setValueAtTime(this._stoppedValue, t), this._oscillator.stop(t), this;
        }
        sync() {
          return this._oscillator.sync(), this._oscillator.syncFrequency(), this;
        }
        unsync() {
          return this._oscillator.unsync(), this._oscillator.unsyncFrequency(), this;
        }
        _setStoppedValue() {
          this._stoppedValue = this._oscillator.getInitialValue(), this._stoppedSignal.value = this._stoppedValue;
        }
        get min() {
          return this._toType(this._scaler.min);
        }
        set min (t) {
          t = this._fromType(t), this._scaler.min = t;
        }
        get max() {
          return this._toType(this._scaler.max);
        }
        set max (t) {
          t = this._fromType(t), this._scaler.max = t;
        }
        get type() {
          return this._oscillator.type;
        }
        set type (t) {
          this._oscillator.type = t, this._setStoppedValue();
        }
        get partials() {
          return this._oscillator.partials;
        }
        set partials (t) {
          this._oscillator.partials = t, this._setStoppedValue();
        }
        get phase() {
          return this._oscillator.phase;
        }
        set phase (t) {
          this._oscillator.phase = t, this._setStoppedValue();
        }
        get units() {
          return this._units;
        }
        set units (t) {
          const e = this.min, s = this.max;
          this._units = t, this.min = e, this.max = s;
        }
        get state() {
          return this._oscillator.state;
        }
        connect(t, e, s) {
          return (t instanceof no || t instanceof po) && (this.convert = t.convert, this.units = t.units), fo(this, t, e, s), this;
        }
        dispose() {
          return super.dispose(), this._oscillator.dispose(), this._stoppedSignal.dispose(), this._zeros.dispose(), this._scaler.dispose(), this._a2g.dispose(), this._amplitudeGain.dispose(), this.amplitude.dispose(), this;
        }
      }
      function cr(t, e = Infinity) {
        const s = new WeakMap;
        return function (n, i) {
          Reflect.defineProperty(n, i, {configurable: true, enumerable: true, get: function () {
            return s.get(this);
          }, set: function (n) {
            Un(n, t, e), s.set(this, n);
          }});
        };
      }
      function hr(t, e = Infinity) {
        const s = new WeakMap;
        return function (n, i) {
          Reflect.defineProperty(n, i, {configurable: true, enumerable: true, get: function () {
            return s.get(this);
          }, set: function (n) {
            Un(this.toSeconds(n), t, e), s.set(this, n);
          }});
        };
      }
      class lr extends jo {
        constructor() {
          const t = ui(lr.getDefaults(), arguments, ["url", "onload"]);
          super(t), this.name = "Player", this._activeSources = new Set, this._buffer = new Ri({onload: this._onload.bind(this, t.onload), onerror: t.onerror, reverse: t.reverse, url: t.url}), this.autostart = t.autostart, this._loop = t.loop, this._loopStart = t.loopStart, this._loopEnd = t.loopEnd, this._playbackRate = t.playbackRate, this.fadeIn = t.fadeIn, this.fadeOut = t.fadeOut;
        }
        static getDefaults() {
          return Object.assign(jo.getDefaults(), {autostart: false, fadeIn: 0, fadeOut: 0, loop: false, loopEnd: 0, loopStart: 0, onload: Ei, onerror: Ei, playbackRate: 1, reverse: false});
        }
        load(t) {
          return ni(this, undefined, undefined, function* () {
            return yield this._buffer.load(t), this._onload(), this;
          });
        }
        _onload(t = Ei) {
          t(), this.autostart && this.start();
        }
        _onSourceEnd(t) {
          this.onstop(this), this._activeSources.delete(t), 0 !== this._activeSources.size || this._synced || "started" !== this._state.getValueAtTime(this.now()) || (this._state.cancel(this.now()), this._state.setStateAtTime("stopped", this.now()));
        }
        start(t, e, s) {
          return super.start(t, e, s), this;
        }
        _start(t, e, s) {
          e = this._loop ? pi(e, this._loopStart) : pi(e, 0);
          const n = this.toSeconds(e), i = s;
          s = pi(s, Math.max(this._buffer.duration - n, 0));
          let o = this.toSeconds(s);
          o /= this._playbackRate, t = this.toSeconds(t);
          const r = new Lo({url: this._buffer, context: this.context, fadeIn: this.fadeIn, fadeOut: this.fadeOut, loop: this._loop, loopEnd: this._loopEnd, loopStart: this._loopStart, onended: this._onSourceEnd.bind(this), playbackRate: this._playbackRate}).connect(this.output);
          this._loop || this._synced || (this._state.cancel(t + o), this._state.setStateAtTime("stopped", t + o, {implicitEnd: true})), this._activeSources.add(r), this._loop && undefined === i ? r.start(t, n) : r.start(t, n, o - this.toSeconds(this.fadeOut));
        }
        _stop(t) {
          const e = this.toSeconds(t);
          this._activeSources.forEach(t => t.stop(e));
        }
        restart(t, e, s) {
          return super.restart(t, e, s), this;
        }
        _restart(t, e, s) {
          var n;
          null === (n = [...this._activeSources].pop()) || undefined === n || n.stop(t), this._start(t, e, s);
        }
        seek(t, e) {
          const s = this.toSeconds(e);
          if ("started" === this._state.getValueAtTime(s)) {
            const e = this.toSeconds(t);
            this._stop(s), this._start(s, e);
          }
          return this;
        }
        setLoopPoints(t, e) {
          return this.loopStart = t, this.loopEnd = e, this;
        }
        get loopStart() {
          return this._loopStart;
        }
        set loopStart (t) {
          this._loopStart = t, this.buffer.loaded && Un(this.toSeconds(t), 0, this.buffer.duration), this._activeSources.forEach(e => {
            e.loopStart = t;
          });
        }
        get loopEnd() {
          return this._loopEnd;
        }
        set loopEnd (t) {
          this._loopEnd = t, this.buffer.loaded && Un(this.toSeconds(t), 0, this.buffer.duration), this._activeSources.forEach(e => {
            e.loopEnd = t;
          });
        }
        get buffer() {
          return this._buffer;
        }
        set buffer (t) {
          this._buffer.set(t);
        }
        get loop() {
          return this._loop;
        }
        set loop (t) {
          if (this._loop !== t && (this._loop = t, this._activeSources.forEach(e => {
            e.loop = t;
          }), t)) {
            const t = this._state.getNextState("stopped", this.now());
            t && this._state.cancel(t.time);
          }
        }
        get playbackRate() {
          return this._playbackRate;
        }
        set playbackRate (t) {
          this._playbackRate = t;
          const e = this.now(), s = this._state.getNextState("stopped", e);
          s && s.implicitEnd && (this._state.cancel(s.time), this._activeSources.forEach(t => t.cancelStop())), this._activeSources.forEach(s => {
            s.playbackRate.setValueAtTime(t, e);
          });
        }
        get reverse() {
          return this._buffer.reverse;
        }
        set reverse (t) {
          this._buffer.reverse = t;
        }
        get loaded() {
          return this._buffer.loaded;
        }
        dispose() {
          return super.dispose(), this._activeSources.forEach(t => t.dispose()), this._activeSources.clear(), this._buffer.dispose(), this;
        }
      }
      si([hr(0)], lr.prototype, "fadeIn", undefined), si([hr(0)], lr.prototype, "fadeOut", undefined);
      class ur extends io {
        constructor() {
          const t = ui(ur.getDefaults(), arguments, ["urls", "onload"], "urls");
          super(t), this.name = "Players", this.input = undefined, this._players = new Map, this._volume = this.output = new xo({context: this.context, volume: t.volume}), this.volume = this._volume.volume, Di(this, "volume"), this._buffers = new So({urls: t.urls, onload: t.onload, baseUrl: t.baseUrl, onerror: t.onerror}), this.mute = t.mute, this._fadeIn = t.fadeIn, this._fadeOut = t.fadeOut;
        }
        static getDefaults() {
          return Object.assign(jo.getDefaults(), {baseUrl: "", fadeIn: 0, fadeOut: 0, mute: false, onload: Ei, onerror: Ei, urls: {}, volume: 0});
        }
        get mute() {
          return this._volume.mute;
        }
        set mute (t) {
          this._volume.mute = t;
        }
        get fadeIn() {
          return this._fadeIn;
        }
        set fadeIn (t) {
          this._fadeIn = t, this._players.forEach(e => {
            e.fadeIn = t;
          });
        }
        get fadeOut() {
          return this._fadeOut;
        }
        set fadeOut (t) {
          this._fadeOut = t, this._players.forEach(e => {
            e.fadeOut = t;
          });
        }
        get state() {
          return Array.from(this._players).some(([t, e]) => "started" === e.state) ? "started" : "stopped";
        }
        has(t) {
          return this._buffers.has(t);
        }
        player(t) {
          if (Bn(this.has(t), `No Player with the name ${t} exists on this object`), !this._players.has(t)) {
            const e = new lr({context: this.context, fadeIn: this._fadeIn, fadeOut: this._fadeOut, url: this._buffers.get(t)}).connect(this.output);
            this._players.set(t, e);
          }
          return this._players.get(t);
        }
        get loaded() {
          return this._buffers.loaded;
        }
        add(t, e, s) {
          return Bn(!this._buffers.has(t), "A buffer with that name already exists on this object"), this._buffers.add(t, e, s), this;
        }
        stopAll(t) {
          return this._players.forEach(e => e.stop(t)), this;
        }
        dispose() {
          return super.dispose(), this._volume.dispose(), this.volume.dispose(), this._players.forEach(t => t.dispose()), this._buffers.dispose(), this;
        }
      }
      class pr extends jo {
        constructor() {
          const t = ui(pr.getDefaults(), arguments, ["url", "onload"]);
          super(t), this.name = "GrainPlayer", this._loopStart = 0, this._loopEnd = 0, this._activeSources = [], this.buffer = new Ri({onload: t.onload, onerror: t.onerror, reverse: t.reverse, url: t.url}), this._clock = new vo({context: this.context, callback: this._tick.bind(this), frequency: 1 / t.grainSize}), this._playbackRate = t.playbackRate, this._grainSize = t.grainSize, this._overlap = t.overlap, this.detune = t.detune, this.overlap = t.overlap, this.loop = t.loop, this.playbackRate = t.playbackRate, this.grainSize = t.grainSize, this.loopStart = t.loopStart, this.loopEnd = t.loopEnd, this.reverse = t.reverse, this._clock.on("stop", this._onstop.bind(this));
        }
        static getDefaults() {
          return Object.assign(jo.getDefaults(), {onload: Ei, onerror: Ei, overlap: 0.1, grainSize: 0.2, playbackRate: 1, detune: 0, loop: false, loopStart: 0, loopEnd: 0, reverse: false});
        }
        _start(t, e, s) {
          e = pi(e, 0), e = this.toSeconds(e), t = this.toSeconds(t);
          const n = 1 / this._clock.frequency.getValueAtTime(t);
          this._clock.start(t, e / n), s && this.stop(t + this.toSeconds(s));
        }
        restart(t, e, s) {
          return super.restart(t, e, s), this;
        }
        _restart(t, e, s) {
          this._stop(t), this._start(t, e, s);
        }
        _stop(t) {
          this._clock.stop(t);
        }
        _onstop(t) {
          this._activeSources.forEach(e => {
            e.fadeOut = 0, e.stop(t);
          }), this.onstop(this);
        }
        _tick(t) {
          const e = this._clock.getTicksAtTime(t), s = e * this._grainSize;
          if (this.log("offset", s), !this.loop && s > this.buffer.duration) return void this.stop(t);
          const n = s < this._overlap ? 0 : this._overlap, i = new Lo({context: this.context, url: this.buffer, fadeIn: n, fadeOut: this._overlap, loop: this.loop, loopStart: this._loopStart, loopEnd: this._loopEnd, playbackRate: Math.pow(2, this.detune / 100 / 12)}).connect(this.output);
          i.start(t, this._grainSize * e), i.stop(t + this._grainSize / this.playbackRate), this._activeSources.push(i), i.onended = () => {
            const t = this._activeSources.indexOf(i);
            -1 !== t && this._activeSources.splice(t, 1);
          };
        }
        get playbackRate() {
          return this._playbackRate;
        }
        set playbackRate (t) {
          Un(t, 0.001), this._playbackRate = t, this.grainSize = this._grainSize;
        }
        get loopStart() {
          return this._loopStart;
        }
        set loopStart (t) {
          this.buffer.loaded && Un(this.toSeconds(t), 0, this.buffer.duration), this._loopStart = this.toSeconds(t);
        }
        get loopEnd() {
          return this._loopEnd;
        }
        set loopEnd (t) {
          this.buffer.loaded && Un(this.toSeconds(t), 0, this.buffer.duration), this._loopEnd = this.toSeconds(t);
        }
        get reverse() {
          return this.buffer.reverse;
        }
        set reverse (t) {
          this.buffer.reverse = t;
        }
        get grainSize() {
          return this._grainSize;
        }
        set grainSize (t) {
          this._grainSize = this.toSeconds(t), this._clock.frequency.setValueAtTime(this._playbackRate / this._grainSize, this.now());
        }
        get overlap() {
          return this._overlap;
        }
        set overlap (t) {
          const e = this.toSeconds(t);
          Un(e, 0), this._overlap = e;
        }
        get loaded() {
          return this.buffer.loaded;
        }
        dispose() {
          return super.dispose(), this.buffer.dispose(), this._clock.dispose(), this._activeSources.forEach(t => t.dispose()), this;
        }
      }
      class dr extends qo {
        constructor() {
          super(...arguments), this.name = "Abs", this._abs = new Io({context: this.context, mapping: t => Math.abs(t) < 0.001 ? 0 : Math.abs(t)}), this.input = this._abs, this.output = this._abs;
        }
        dispose() {
          return super.dispose(), this._abs.dispose(), this;
        }
      }
      class fr extends qo {
        constructor() {
          super(...arguments), this.name = "GainToAudio", this._norm = new Io({context: this.context, mapping: t => 2 * Math.abs(t) - 1}), this.input = this._norm, this.output = this._norm;
        }
        dispose() {
          return super.dispose(), this._norm.dispose(), this;
        }
      }
      class _r extends qo {
        constructor() {
          super(...arguments), this.name = "Negate", this._multiply = new $o({context: this.context, value: -1}), this.input = this._multiply, this.output = this._multiply;
        }
        dispose() {
          return super.dispose(), this._multiply.dispose(), this;
        }
      }
      class mr extends po {
        constructor() {
          super(ui(mr.getDefaults(), arguments, ["value"])), this.override = false, this.name = "Subtract", this._sum = new ho({context: this.context}), this.input = this._sum, this.output = this._sum, this._neg = new _r({context: this.context}), this.subtrahend = this._param, oo(this._constantSource, this._neg, this._sum);
        }
        static getDefaults() {
          return Object.assign(po.getDefaults(), {value: 0});
        }
        dispose() {
          return super.dispose(), this._neg.dispose(), this._sum.dispose(), this;
        }
      }
      class gr extends qo {
        constructor() {
          super(ui(gr.getDefaults(), arguments)), this.name = "GreaterThanZero", this._thresh = this.output = new Io({context: this.context, length: 127, mapping: t => t <= 0 ? 0 : 1}), this._scale = this.input = new $o({context: this.context, value: 1e4}), this._scale.connect(this._thresh);
        }
        dispose() {
          return super.dispose(), this._scale.dispose(), this._thresh.dispose(), this;
        }
      }
      class vr extends po {
        constructor() {
          const t = ui(vr.getDefaults(), arguments, ["value"]);
          super(t), this.name = "GreaterThan", this.override = false, this._subtract = this.input = new mr({context: this.context, value: t.value}), this._gtz = this.output = new gr({context: this.context}), this.comparator = this._param = this._subtract.subtrahend, Di(this, "comparator"), this._subtract.connect(this._gtz);
        }
        static getDefaults() {
          return Object.assign(po.getDefaults(), {value: 0});
        }
        dispose() {
          return super.dispose(), this._gtz.dispose(), this._subtract.dispose(), this.comparator.dispose(), this;
        }
      }
      class yr extends or {
        constructor() {
          const t = ui(yr.getDefaults(), arguments, ["min", "max", "exponent"]);
          super(t), this.name = "ScaleExp", this.input = this._exp = new Fo({context: this.context, value: t.exponent}), this._exp.connect(this._mult);
        }
        static getDefaults() {
          return Object.assign(or.getDefaults(), {exponent: 1});
        }
        get exponent() {
          return this._exp.value;
        }
        set exponent (t) {
          this._exp.value = t;
        }
        dispose() {
          return super.dispose(), this._exp.dispose(), this;
        }
      }
      class xr extends po {
        constructor() {
          const t = ui(po.getDefaults(), arguments, ["value", "units"]);
          super(t), this.name = "SyncedSignal", this.override = false, this._lastVal = t.value, this._synced = this.context.transport.scheduleRepeat(this._onTick.bind(this), "1i"), this._syncedCallback = this._anchorValue.bind(this), this.context.transport.on("start", this._syncedCallback), this.context.transport.on("pause", this._syncedCallback), this.context.transport.on("stop", this._syncedCallback), this._constantSource.disconnect(), this._constantSource.stop(0), this._constantSource = this.output = new uo({context: this.context, offset: t.value, units: t.units}).start(0), this.setValueAtTime(t.value, 0);
        }
        _onTick(t) {
          const e = super.getValueAtTime(this.context.transport.seconds);
          this._lastVal !== e && (this._lastVal = e, this._constantSource.offset.setValueAtTime(e, t));
        }
        _anchorValue(t) {
          const e = super.getValueAtTime(this.context.transport.seconds);
          this._lastVal = e, this._constantSource.offset.cancelAndHoldAtTime(t), this._constantSource.offset.setValueAtTime(e, t);
        }
        getValueAtTime(t) {
          const e = new Ki(this.context, t).toSeconds();
          return super.getValueAtTime(e);
        }
        setValueAtTime(t, e) {
          const s = new Ki(this.context, e).toSeconds();
          return super.setValueAtTime(t, s), this;
        }
        linearRampToValueAtTime(t, e) {
          const s = new Ki(this.context, e).toSeconds();
          return super.linearRampToValueAtTime(t, s), this;
        }
        exponentialRampToValueAtTime(t, e) {
          const s = new Ki(this.context, e).toSeconds();
          return super.exponentialRampToValueAtTime(t, s), this;
        }
        setTargetAtTime(t, e, s) {
          const n = new Ki(this.context, e).toSeconds();
          return super.setTargetAtTime(t, n, s), this;
        }
        cancelScheduledValues(t) {
          const e = new Ki(this.context, t).toSeconds();
          return super.cancelScheduledValues(e), this;
        }
        setValueCurveAtTime(t, e, s, n) {
          const i = new Ki(this.context, e).toSeconds();
          return s = this.toSeconds(s), super.setValueCurveAtTime(t, i, s, n), this;
        }
        cancelAndHoldAtTime(t) {
          const e = new Ki(this.context, t).toSeconds();
          return super.cancelAndHoldAtTime(e), this;
        }
        setRampPoint(t) {
          const e = new Ki(this.context, t).toSeconds();
          return super.setRampPoint(e), this;
        }
        exponentialRampTo(t, e, s) {
          const n = new Ki(this.context, s).toSeconds();
          return super.exponentialRampTo(t, e, n), this;
        }
        linearRampTo(t, e, s) {
          const n = new Ki(this.context, s).toSeconds();
          return super.linearRampTo(t, e, n), this;
        }
        targetRampTo(t, e, s) {
          const n = new Ki(this.context, s).toSeconds();
          return super.targetRampTo(t, e, n), this;
        }
        dispose() {
          return super.dispose(), this.context.transport.clear(this._synced), this.context.transport.off("start", this._syncedCallback), this.context.transport.off("pause", this._syncedCallback), this.context.transport.off("stop", this._syncedCallback), this._constantSource.dispose(), this;
        }
      }
      class wr extends io {
        constructor() {
          const t = ui(wr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"]);
          super(t), this.name = "Envelope", this._sig = new po({context: this.context, value: 0}), this.output = this._sig, this.input = undefined, this.attack = t.attack, this.decay = t.decay, this.sustain = t.sustain, this.release = t.release, this.attackCurve = t.attackCurve, this.releaseCurve = t.releaseCurve, this.decayCurve = t.decayCurve;
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {attack: 0.01, attackCurve: "linear", decay: 0.1, decayCurve: "exponential", release: 1, releaseCurve: "exponential", sustain: 0.5});
        }
        get value() {
          return this.getValueAtTime(this.now());
        }
        _getCurve(t, e) {
          if ("string" == typeof t) return t;
          {
            let s;
            for (s in br) if (br[s][e] === t) return s;
            return t;
          }
        }
        _setCurve(t, e, s) {
          if ("string" == typeof s && Reflect.has(br, s)) {
            const n = br[s];
            "[object Object]" === Object.prototype.toString.call(n) && n.constructor === Object ? "_decayCurve" !== t && (this[t] = n[e]) : this[t] = n;
          } else {
            if (!Array.isArray(s) || "_decayCurve" === t) throw new Error("Envelope: invalid curve: " + s);
            this[t] = s;
          }
        }
        get attackCurve() {
          return this._getCurve(this._attackCurve, "In");
        }
        set attackCurve (t) {
          this._setCurve("_attackCurve", "In", t);
        }
        get releaseCurve() {
          return this._getCurve(this._releaseCurve, "Out");
        }
        set releaseCurve (t) {
          this._setCurve("_releaseCurve", "Out", t);
        }
        get decayCurve() {
          return this._getCurve(this._decayCurve, "Out");
        }
        set decayCurve (t) {
          this._setCurve("_decayCurve", "Out", t);
        }
        triggerAttack(t, e = 1) {
          this.log("triggerAttack", t, e), t = this.toSeconds(t);
          let s = this.toSeconds(this.attack);
          const n = this.toSeconds(this.decay), i = this.getValueAtTime(t);
          if (i > 0 && (s = (1 - i) / (1 / s)), s < this.sampleTime) this._sig.cancelScheduledValues(t), this._sig.setValueAtTime(e, t); else if ("linear" === this._attackCurve) this._sig.linearRampTo(e, s, t); else if ("exponential" === this._attackCurve) this._sig.targetRampTo(e, s, t); else {
            this._sig.cancelAndHoldAtTime(t);
            let n = this._attackCurve;
            for (let t = 1; t < n.length; t++) if (n[t - 1] <= i && i <= n[t]) {
              n = this._attackCurve.slice(t), n[0] = i;
              break;
            }
            this._sig.setValueCurveAtTime(n, t, s, e);
          }
          if (n && this.sustain < 1) {
            const i = e * this.sustain, o = t + s;
            this.log("decay", o), "linear" === this._decayCurve ? this._sig.linearRampToValueAtTime(i, n + o) : this._sig.exponentialApproachValueAtTime(i, o, n);
          }
          return this;
        }
        triggerRelease(t) {
          this.log("triggerRelease", t), t = this.toSeconds(t);
          const e = this.getValueAtTime(t);
          if (e > 0) {
            const s = this.toSeconds(this.release);
            s < this.sampleTime ? this._sig.setValueAtTime(0, t) : "linear" === this._releaseCurve ? this._sig.linearRampTo(0, s, t) : "exponential" === this._releaseCurve ? this._sig.targetRampTo(0, s, t) : (Bn(Array.isArray(this._releaseCurve), "releaseCurve must be either 'linear', 'exponential' or an array"), this._sig.cancelAndHoldAtTime(t), this._sig.setValueCurveAtTime(this._releaseCurve, t, s, e));
          }
          return this;
        }
        getValueAtTime(t) {
          return this._sig.getValueAtTime(t);
        }
        triggerAttackRelease(t, e, s = 1) {
          return e = this.toSeconds(e), this.triggerAttack(e, s), this.triggerRelease(e + this.toSeconds(t)), this;
        }
        cancel(t) {
          return this._sig.cancelScheduledValues(this.toSeconds(t)), this;
        }
        connect(t, e = 0, s = 0) {
          return fo(this, t, e, s), this;
        }
        asArray() {
          return ni(this, arguments, undefined, function* (t = 1024) {
            const e = t / this.context.sampleRate, s = new qi(1, e, this.context.sampleRate), n = this.toSeconds(this.attack) + this.toSeconds(this.decay), i = n + this.toSeconds(this.release), o = 0.1 * i, r = i + o, a = new this.constructor(Object.assign(this.get(), {attack: e * this.toSeconds(this.attack) / r, decay: e * this.toSeconds(this.decay) / r, release: e * this.toSeconds(this.release) / r, context: s}));
            return a._sig.toDestination(), a.triggerAttackRelease(e * (n + o) / r, 0), (yield s.render()).getChannelData(0);
          });
        }
        dispose() {
          return super.dispose(), this._sig.dispose(), this;
        }
      }
      si([hr(0)], wr.prototype, "attack", undefined), si([hr(0)], wr.prototype, "decay", undefined), si([cr(0, 1)], wr.prototype, "sustain", undefined), si([hr(0)], wr.prototype, "release", undefined);
      const br = (() => {
        const t = 128;
        let e, s;
        const n = [];
        for (e = 0; e < t; e++) n[e] = Math.sin(e / 127 * (Math.PI / 2));
        const i = [];
        for (e = 0; e < 127; e++) {
          s = e / 127;
          const t = Math.sin(s * (2 * Math.PI) * 6.4 - Math.PI / 2) + 1;
          i[e] = t / 10 + 0.83 * s;
        }
        i[127] = 1;
        const o = [];
        for (e = 0; e < t; e++) o[e] = Math.ceil(e / 127 * 5) / 5;
        const r = [];
        for (e = 0; e < t; e++) s = e / 127, r[e] = 0.5 * (1 - Math.cos(Math.PI * s));
        const a = [];
        for (e = 0; e < t; e++) {
          s = e / 127;
          const t = 4 * Math.pow(s, 3) + 0.2, n = Math.cos(t * Math.PI * 2 * s);
          a[e] = Math.abs(n * (1 - s));
        }
        function c(t) {
          const e = new Array(t.length);
          for (let s = 0; s < t.length; s++) e[s] = 1 - t[s];
          return e;
        }
        return {bounce: {In: c(a), Out: a}, cosine: {In: n, Out: (h = n, h.slice(0).reverse())}, exponential: "exponential", linear: "linear", ripple: {In: i, Out: c(i)}, sine: {In: r, Out: c(r)}, step: {In: o, Out: c(o)}};
        var h;
      })();
      class Tr extends io {
        constructor() {
          const t = ui(Tr.getDefaults(), arguments);
          super(t), this._scheduledEvents = [], this._synced = false, this._original_triggerAttack = this.triggerAttack, this._original_triggerRelease = this.triggerRelease, this._syncedRelease = t => this._original_triggerRelease(t), this._volume = this.output = new xo({context: this.context, volume: t.volume}), this.volume = this._volume.volume, Di(this, "volume");
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {volume: 0});
        }
        sync() {
          return this._syncState() && (this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 0), this.context.transport.on("stop", this._syncedRelease), this.context.transport.on("pause", this._syncedRelease), this.context.transport.on("loopEnd", this._syncedRelease)), this;
        }
        _syncState() {
          let t = false;
          return this._synced || (this._synced = true, t = true), t;
        }
        _syncMethod(t, e) {
          const s = this["_original_" + t] = this[t];
          this[t] = (...t) => {
            const n = t[e], i = this.context.transport.schedule(n => {
              t[e] = n, s.apply(this, t);
            }, n);
            this._scheduledEvents.push(i);
          };
        }
        unsync() {
          return this._scheduledEvents.forEach(t => this.context.transport.clear(t)), this._scheduledEvents = [], this._synced && (this._synced = false, this.triggerAttack = this._original_triggerAttack, this.triggerRelease = this._original_triggerRelease, this.context.transport.off("stop", this._syncedRelease), this.context.transport.off("pause", this._syncedRelease), this.context.transport.off("loopEnd", this._syncedRelease)), this;
        }
        triggerAttackRelease(t, e, s, n) {
          const i = this.toSeconds(s), o = this.toSeconds(e);
          return this.triggerAttack(t, i, n), this.triggerRelease(i + o), this;
        }
        dispose() {
          return super.dispose(), this._volume.dispose(), this.unsync(), this._scheduledEvents = [], this;
        }
      }
      class Sr extends Tr {
        constructor() {
          const t = ui(Sr.getDefaults(), arguments);
          super(t), this.portamento = t.portamento, this.onsilence = t.onsilence;
        }
        static getDefaults() {
          return Object.assign(Tr.getDefaults(), {detune: 0, onsilence: Ei, portamento: 0});
        }
        triggerAttack(t, e, s = 1) {
          this.log("triggerAttack", t, e, s);
          const n = this.toSeconds(e);
          return this._triggerEnvelopeAttack(n, s), this.setNote(t, n), this;
        }
        triggerRelease(t) {
          this.log("triggerRelease", t);
          const e = this.toSeconds(t);
          return this._triggerEnvelopeRelease(e), this;
        }
        setNote(t, e) {
          const s = this.toSeconds(e), n = t instanceof Yi ? t.toFrequency() : t;
          if (this.portamento > 0 && this.getLevelAtTime(s) > 0.05) {
            const t = this.toSeconds(this.portamento);
            this.frequency.exponentialRampTo(n, t, s);
          } else this.frequency.setValueAtTime(n, s);
          return this;
        }
      }
      si([hr(0)], Sr.prototype, "portamento", undefined);
      class kr extends wr {
        constructor() {
          super(ui(kr.getDefaults(), arguments, ["attack", "decay", "sustain", "release"])), this.name = "AmplitudeEnvelope", this._gainNode = new ho({context: this.context, gain: 0}), this.output = this._gainNode, this.input = this._gainNode, this._sig.connect(this._gainNode.gain), this.output = this._gainNode, this.input = this._gainNode;
        }
        dispose() {
          return super.dispose(), this._gainNode.dispose(), this;
        }
      }
      class Ar extends Sr {
        constructor() {
          const t = ui(Ar.getDefaults(), arguments);
          super(t), this.name = "Synth", this.oscillator = new nr(Object.assign({context: this.context, detune: t.detune, onstop: () => this.onsilence(this)}, t.oscillator)), this.frequency = this.oscillator.frequency, this.detune = this.oscillator.detune, this.envelope = new kr(Object.assign({context: this.context}, t.envelope)), this.oscillator.chain(this.envelope, this.output), Di(this, ["oscillator", "frequency", "detune", "envelope"]);
        }
        static getDefaults() {
          return Object.assign(Sr.getDefaults(), {envelope: Object.assign(di(wr.getDefaults(), Object.keys(io.getDefaults())), {attack: 0.005, decay: 0.1, release: 1, sustain: 0.3}), oscillator: Object.assign(di(nr.getDefaults(), [...Object.keys(jo.getDefaults()), "frequency", "detune"]), {type: "triangle"})});
        }
        _triggerEnvelopeAttack(t, e) {
          if (this.envelope.triggerAttack(t, e), this.oscillator.start(t), 0 === this.envelope.sustain) {
            const e = this.toSeconds(this.envelope.attack), s = this.toSeconds(this.envelope.decay);
            this.oscillator.stop(t + e + s);
          }
        }
        _triggerEnvelopeRelease(t) {
          this.envelope.triggerRelease(t), this.oscillator.stop(t + this.toSeconds(this.envelope.release));
        }
        getLevelAtTime(t) {
          return t = this.toSeconds(t), this.envelope.getValueAtTime(t);
        }
        dispose() {
          return super.dispose(), this.oscillator.dispose(), this.envelope.dispose(), this;
        }
      }
      class Cr extends Sr {
        constructor() {
          const t = ui(Cr.getDefaults(), arguments);
          super(t), this.name = "ModulationSynth", this._carrier = new Ar({context: this.context, oscillator: t.oscillator, envelope: t.envelope, onsilence: () => this.onsilence(this), volume: -10}), this._modulator = new Ar({context: this.context, oscillator: t.modulation, envelope: t.modulationEnvelope, volume: -10}), this.oscillator = this._carrier.oscillator, this.envelope = this._carrier.envelope, this.modulation = this._modulator.oscillator, this.modulationEnvelope = this._modulator.envelope, this.frequency = new po({context: this.context, units: "frequency"}), this.detune = new po({context: this.context, value: t.detune, units: "cents"}), this.harmonicity = new $o({context: this.context, value: t.harmonicity, minValue: 0}), this._modulationNode = new ho({context: this.context, gain: 0}), Di(this, ["frequency", "harmonicity", "oscillator", "envelope", "modulation", "modulationEnvelope", "detune"]);
        }
        static getDefaults() {
          return Object.assign(Sr.getDefaults(), {harmonicity: 3, oscillator: Object.assign(di(nr.getDefaults(), [...Object.keys(jo.getDefaults()), "frequency", "detune"]), {type: "sine"}), envelope: Object.assign(di(wr.getDefaults(), Object.keys(io.getDefaults())), {attack: 0.01, decay: 0.01, sustain: 1, release: 0.5}), modulation: Object.assign(di(nr.getDefaults(), [...Object.keys(jo.getDefaults()), "frequency", "detune"]), {type: "square"}), modulationEnvelope: Object.assign(di(wr.getDefaults(), Object.keys(io.getDefaults())), {attack: 0.5, decay: 0, sustain: 1, release: 0.5})});
        }
        _triggerEnvelopeAttack(t, e) {
          this._carrier._triggerEnvelopeAttack(t, e), this._modulator._triggerEnvelopeAttack(t, e);
        }
        _triggerEnvelopeRelease(t) {
          return this._carrier._triggerEnvelopeRelease(t), this._modulator._triggerEnvelopeRelease(t), this;
        }
        getLevelAtTime(t) {
          return t = this.toSeconds(t), this.envelope.getValueAtTime(t);
        }
        dispose() {
          return super.dispose(), this._carrier.dispose(), this._modulator.dispose(), this.frequency.dispose(), this.detune.dispose(), this.harmonicity.dispose(), this._modulationNode.dispose(), this;
        }
      }
      class Or extends Cr {
        constructor() {
          super(ui(Or.getDefaults(), arguments)), this.name = "AMSynth", this._modulationScale = new Yo({context: this.context}), this.frequency.connect(this._carrier.frequency), this.frequency.chain(this.harmonicity, this._modulator.frequency), this.detune.fan(this._carrier.detune, this._modulator.detune), this._modulator.chain(this._modulationScale, this._modulationNode.gain), this._carrier.chain(this._modulationNode, this.output);
        }
        dispose() {
          return super.dispose(), this._modulationScale.dispose(), this;
        }
      }
      class Dr extends io {
        constructor() {
          const t = ui(Dr.getDefaults(), arguments, ["frequency", "type"]);
          super(t), this.name = "BiquadFilter", this._filter = this.context.createBiquadFilter(), this.input = this.output = this._filter, this.Q = new no({context: this.context, units: "number", value: t.Q, param: this._filter.Q}), this.frequency = new no({context: this.context, units: "frequency", value: t.frequency, param: this._filter.frequency}), this.detune = new no({context: this.context, units: "cents", value: t.detune, param: this._filter.detune}), this.gain = new no({context: this.context, units: "decibels", convert: false, value: t.gain, param: this._filter.gain}), this.type = t.type;
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {Q: 1, type: "lowpass", frequency: 350, detune: 0, gain: 0});
        }
        get type() {
          return this._filter.type;
        }
        set type (t) {
          Bn(-1 !== ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"].indexOf(t), `Invalid filter type: ${t}`), this._filter.type = t;
        }
        getFrequencyResponse(t = 128) {
          const e = new Float32Array(t);
          for (let s = 0; s < t; s++) {
            const n = 19980 * Math.pow(s / t, 2) + 20;
            e[s] = n;
          }
          const s = new Float32Array(t), n = new Float32Array(t), i = this.context.createBiquadFilter();
          return i.type = this.type, i.Q.value = this.Q.value, i.frequency.value = this.frequency.value, i.gain.value = this.gain.value, i.getFrequencyResponse(e, s, n), s;
        }
        dispose() {
          return super.dispose(), this._filter.disconnect(), this.Q.dispose(), this.frequency.dispose(), this.gain.dispose(), this.detune.dispose(), this;
        }
      }
      class Mr extends io {
        constructor() {
          const t = ui(Mr.getDefaults(), arguments, ["frequency", "type", "rolloff"]);
          super(t), this.name = "Filter", this.input = new ho({context: this.context}), this.output = new ho({context: this.context}), this._filters = [], this._filters = [], this.Q = new po({context: this.context, units: "positive", value: t.Q}), this.frequency = new po({context: this.context, units: "frequency", value: t.frequency}), this.detune = new po({context: this.context, units: "cents", value: t.detune}), this.gain = new po({context: this.context, units: "decibels", convert: false, value: t.gain}), this._type = t.type, this.rolloff = t.rolloff, Di(this, ["detune", "frequency", "gain", "Q"]);
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {Q: 1, detune: 0, frequency: 350, gain: 0, rolloff: -12, type: "lowpass"});
        }
        get type() {
          return this._type;
        }
        set type (t) {
          Bn(-1 !== ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"].indexOf(t), `Invalid filter type: ${t}`), this._type = t, this._filters.forEach(e => e.type = t);
        }
        get rolloff() {
          return this._rolloff;
        }
        set rolloff (t) {
          const e = "number" == typeof t ? t : parseInt(t, 10), s = [-12, -24, -48, -96];
          let n = s.indexOf(e);
          Bn(-1 !== n, `rolloff can only be ${s.join(", ")}`), n += 1, this._rolloff = e, this.input.disconnect(), this._filters.forEach(t => t.disconnect()), this._filters = new Array(n);
          for (let t = 0; t < n; t++) {
            const e = new Dr({context: this.context});
            e.type = this._type, this.frequency.connect(e.frequency), this.detune.connect(e.detune), this.Q.connect(e.Q), this.gain.connect(e.gain), this._filters[t] = e;
          }
          this._internalChannels = this._filters, oo(this.input, ...this._internalChannels, this.output);
        }
        getFrequencyResponse(t = 128) {
          const e = new Dr({frequency: this.frequency.value, gain: this.gain.value, Q: this.Q.value, type: this._type, detune: this.detune.value}), s = new Float32Array(t).map(() => 1);
          return this._filters.forEach(() => {
            e.getFrequencyResponse(t).forEach((t, e) => s[e] *= t);
          }), e.dispose(), s;
        }
        dispose() {
          return super.dispose(), this._filters.forEach(t => {
            t.dispose();
          }), Mi(this, ["detune", "frequency", "gain", "Q"]), this.frequency.dispose(), this.Q.dispose(), this.detune.dispose(), this.gain.dispose(), this;
        }
      }
      class Er extends wr {
        constructor() {
          const t = ui(Er.getDefaults(), arguments, ["attack", "decay", "sustain", "release"]);
          super(t), this.name = "FrequencyEnvelope", this._octaves = t.octaves, this._baseFrequency = this.toFrequency(t.baseFrequency), this._exponent = this.input = new Fo({context: this.context, value: t.exponent}), this._scale = this.output = new or({context: this.context, min: this._baseFrequency, max: this._baseFrequency * Math.pow(2, this._octaves)}), this._sig.chain(this._exponent, this._scale);
        }
        static getDefaults() {
          return Object.assign(wr.getDefaults(), {baseFrequency: 200, exponent: 1, octaves: 4});
        }
        get baseFrequency() {
          return this._baseFrequency;
        }
        set baseFrequency (t) {
          const e = this.toFrequency(t);
          Un(e, 0), this._baseFrequency = e, this._scale.min = this._baseFrequency, this.octaves = this._octaves;
        }
        get octaves() {
          return this._octaves;
        }
        set octaves (t) {
          this._octaves = t, this._scale.max = this._baseFrequency * Math.pow(2, t);
        }
        get exponent() {
          return this._exponent.value;
        }
        set exponent (t) {
          this._exponent.value = t;
        }
        dispose() {
          return super.dispose(), this._exponent.dispose(), this._scale.dispose(), this;
        }
      }
      class Rr extends Sr {
        constructor() {
          const t = ui(Rr.getDefaults(), arguments);
          super(t), this.name = "MonoSynth", this.oscillator = new nr(Object.assign(t.oscillator, {context: this.context, detune: t.detune, onstop: () => this.onsilence(this)})), this.frequency = this.oscillator.frequency, this.detune = this.oscillator.detune, this.filter = new Mr(Object.assign(t.filter, {context: this.context})), this.filterEnvelope = new Er(Object.assign(t.filterEnvelope, {context: this.context})), this.envelope = new kr(Object.assign(t.envelope, {context: this.context})), this.oscillator.chain(this.filter, this.envelope, this.output), this.filterEnvelope.connect(this.filter.frequency), Di(this, ["oscillator", "frequency", "detune", "filter", "filterEnvelope", "envelope"]);
        }
        static getDefaults() {
          return Object.assign(Sr.getDefaults(), {envelope: Object.assign(di(wr.getDefaults(), Object.keys(io.getDefaults())), {attack: 0.005, decay: 0.1, release: 1, sustain: 0.9}), filter: Object.assign(di(Mr.getDefaults(), Object.keys(io.getDefaults())), {Q: 1, rolloff: -12, type: "lowpass"}), filterEnvelope: Object.assign(di(Er.getDefaults(), Object.keys(io.getDefaults())), {attack: 0.6, baseFrequency: 200, decay: 0.2, exponent: 2, octaves: 3, release: 2, sustain: 0.5}), oscillator: Object.assign(di(nr.getDefaults(), Object.keys(jo.getDefaults())), {type: "sawtooth"})});
        }
        _triggerEnvelopeAttack(t, e = 1) {
          if (this.envelope.triggerAttack(t, e), this.filterEnvelope.triggerAttack(t), this.oscillator.start(t), 0 === this.envelope.sustain) {
            const e = this.toSeconds(this.envelope.attack), s = this.toSeconds(this.envelope.decay);
            this.oscillator.stop(t + e + s);
          }
        }
        _triggerEnvelopeRelease(t) {
          this.envelope.triggerRelease(t), this.filterEnvelope.triggerRelease(t), this.oscillator.stop(t + this.toSeconds(this.envelope.release));
        }
        getLevelAtTime(t) {
          return t = this.toSeconds(t), this.envelope.getValueAtTime(t);
        }
        dispose() {
          return super.dispose(), this.oscillator.dispose(), this.envelope.dispose(), this.filterEnvelope.dispose(), this.filter.dispose(), this;
        }
      }
      class qr extends Sr {
        constructor() {
          const t = ui(qr.getDefaults(), arguments);
          super(t), this.name = "DuoSynth", this.voice0 = new Rr(Object.assign(t.voice0, {context: this.context, onsilence: () => this.onsilence(this)})), this.voice1 = new Rr(Object.assign(t.voice1, {context: this.context})), this.harmonicity = new $o({context: this.context, units: "positive", value: t.harmonicity}), this._vibrato = new ar({frequency: t.vibratoRate, context: this.context, min: -50, max: 50}), this._vibrato.start(), this.vibratoRate = this._vibrato.frequency, this._vibratoGain = new ho({context: this.context, units: "normalRange", gain: t.vibratoAmount}), this.vibratoAmount = this._vibratoGain.gain, this.frequency = new po({context: this.context, units: "frequency", value: 440}), this.detune = new po({context: this.context, units: "cents", value: t.detune}), this.frequency.connect(this.voice0.frequency), this.frequency.chain(this.harmonicity, this.voice1.frequency), this._vibrato.connect(this._vibratoGain), this._vibratoGain.fan(this.voice0.detune, this.voice1.detune), this.detune.fan(this.voice0.detune, this.voice1.detune), this.voice0.connect(this.output), this.voice1.connect(this.output), Di(this, ["voice0", "voice1", "frequency", "vibratoAmount", "vibratoRate"]);
        }
        getLevelAtTime(t) {
          return t = this.toSeconds(t), this.voice0.envelope.getValueAtTime(t) + this.voice1.envelope.getValueAtTime(t);
        }
        static getDefaults() {
          return li(Sr.getDefaults(), {vibratoAmount: 0.5, vibratoRate: 5, harmonicity: 1.5, voice0: li(di(Rr.getDefaults(), Object.keys(Sr.getDefaults())), {filterEnvelope: {attack: 0.01, decay: 0, sustain: 1, release: 0.5}, envelope: {attack: 0.01, decay: 0, sustain: 1, release: 0.5}}), voice1: li(di(Rr.getDefaults(), Object.keys(Sr.getDefaults())), {filterEnvelope: {attack: 0.01, decay: 0, sustain: 1, release: 0.5}, envelope: {attack: 0.01, decay: 0, sustain: 1, release: 0.5}})});
        }
        _triggerEnvelopeAttack(t, e) {
          this.voice0._triggerEnvelopeAttack(t, e), this.voice1._triggerEnvelopeAttack(t, e);
        }
        _triggerEnvelopeRelease(t) {
          return this.voice0._triggerEnvelopeRelease(t), this.voice1._triggerEnvelopeRelease(t), this;
        }
        dispose() {
          return super.dispose(), this.voice0.dispose(), this.voice1.dispose(), this.frequency.dispose(), this.detune.dispose(), this._vibrato.dispose(), this.vibratoRate.dispose(), this._vibratoGain.dispose(), this.harmonicity.dispose(), this;
        }
      }
      class Ir extends Cr {
        constructor() {
          const t = ui(Ir.getDefaults(), arguments);
          super(t), this.name = "FMSynth", this.modulationIndex = new $o({context: this.context, value: t.modulationIndex}), this.frequency.connect(this._carrier.frequency), this.frequency.chain(this.harmonicity, this._modulator.frequency), this.frequency.chain(this.modulationIndex, this._modulationNode), this.detune.fan(this._carrier.detune, this._modulator.detune), this._modulator.connect(this._modulationNode.gain), this._modulationNode.connect(this._carrier.frequency), this._carrier.connect(this.output);
        }
        static getDefaults() {
          return Object.assign(Cr.getDefaults(), {modulationIndex: 10});
        }
        dispose() {
          return super.dispose(), this.modulationIndex.dispose(), this;
        }
      }
      const Fr = [1, 1.483, 1.932, 2.546, 2.63, 3.897];
      class Vr extends Sr {
        constructor() {
          const t = ui(Vr.getDefaults(), arguments);
          super(t), this.name = "MetalSynth", this._oscillators = [], this._freqMultipliers = [], this.detune = new po({context: this.context, units: "cents", value: t.detune}), this.frequency = new po({context: this.context, units: "frequency"}), this._amplitude = new ho({context: this.context, gain: 0}).connect(this.output), this._highpass = new Mr({Q: 0, context: this.context, type: "highpass"}).connect(this._amplitude);
          for (let e = 0; e < Fr.length; e++) {
            const s = new Jo({context: this.context, harmonicity: t.harmonicity, modulationIndex: t.modulationIndex, modulationType: "square", onstop: 0 === e ? () => this.onsilence(this) : Ei, type: "square"});
            s.connect(this._highpass), this._oscillators[e] = s;
            const n = new $o({context: this.context, value: Fr[e]});
            this._freqMultipliers[e] = n, this.frequency.chain(n, s.frequency), this.detune.connect(s.detune);
          }
          this._filterFreqScaler = new or({context: this.context, max: 7e3, min: this.toFrequency(t.resonance)}), this.envelope = new wr({attack: t.envelope.attack, attackCurve: "linear", context: this.context, decay: t.envelope.decay, release: t.envelope.release, sustain: 0}), this.envelope.chain(this._filterFreqScaler, this._highpass.frequency), this.envelope.connect(this._amplitude.gain), this._octaves = t.octaves, this.octaves = t.octaves;
        }
        static getDefaults() {
          return li(Sr.getDefaults(), {envelope: Object.assign(di(wr.getDefaults(), Object.keys(io.getDefaults())), {attack: 0.001, decay: 1.4, release: 0.2}), harmonicity: 5.1, modulationIndex: 32, octaves: 1.5, resonance: 4e3});
        }
        _triggerEnvelopeAttack(t, e = 1) {
          return this.envelope.triggerAttack(t, e), this._oscillators.forEach(e => e.start(t)), 0 === this.envelope.sustain && this._oscillators.forEach(e => {
            e.stop(t + this.toSeconds(this.envelope.attack) + this.toSeconds(this.envelope.decay));
          }), this;
        }
        _triggerEnvelopeRelease(t) {
          return this.envelope.triggerRelease(t), this._oscillators.forEach(e => e.stop(t + this.toSeconds(this.envelope.release))), this;
        }
        getLevelAtTime(t) {
          return t = this.toSeconds(t), this.envelope.getValueAtTime(t);
        }
        get modulationIndex() {
          return this._oscillators[0].modulationIndex.value;
        }
        set modulationIndex (t) {
          this._oscillators.forEach(e => e.modulationIndex.value = t);
        }
        get harmonicity() {
          return this._oscillators[0].harmonicity.value;
        }
        set harmonicity (t) {
          this._oscillators.forEach(e => e.harmonicity.value = t);
        }
        get resonance() {
          return this._filterFreqScaler.min;
        }
        set resonance (t) {
          this._filterFreqScaler.min = this.toFrequency(t), this.octaves = this._octaves;
        }
        get octaves() {
          return this._octaves;
        }
        set octaves (t) {
          this._octaves = t, this._filterFreqScaler.max = this._filterFreqScaler.min * Math.pow(2, t);
        }
        dispose() {
          return super.dispose(), this._oscillators.forEach(t => t.dispose()), this._freqMultipliers.forEach(t => t.dispose()), this.frequency.dispose(), this.detune.dispose(), this._filterFreqScaler.dispose(), this._amplitude.dispose(), this.envelope.dispose(), this._highpass.dispose(), this;
        }
      }
      class Nr extends Ar {
        constructor() {
          const t = ui(Nr.getDefaults(), arguments);
          super(t), this.name = "MembraneSynth", this.portamento = 0, this.pitchDecay = t.pitchDecay, this.octaves = t.octaves, Di(this, ["oscillator", "envelope"]);
        }
        static getDefaults() {
          return li(Sr.getDefaults(), Ar.getDefaults(), {envelope: {attack: 0.001, attackCurve: "exponential", decay: 0.4, release: 1.4, sustain: 0.01}, octaves: 10, oscillator: {type: "sine"}, pitchDecay: 0.05});
        }
        setNote(t, e) {
          const s = this.toSeconds(e), n = this.toFrequency(t instanceof Yi ? t.toFrequency() : t), i = n * this.octaves;
          return this.oscillator.frequency.setValueAtTime(i, s), this.oscillator.frequency.exponentialRampToValueAtTime(n, s + this.toSeconds(this.pitchDecay)), this;
        }
        dispose() {
          return super.dispose(), this;
        }
      }
      si([cr(0)], Nr.prototype, "octaves", undefined), si([hr(0)], Nr.prototype, "pitchDecay", undefined);
      class Pr extends Tr {
        constructor() {
          const t = ui(Pr.getDefaults(), arguments);
          super(t), this.name = "NoiseSynth", this.noise = new zo(Object.assign({context: this.context}, t.noise)), this.envelope = new kr(Object.assign({context: this.context}, t.envelope)), this.noise.chain(this.envelope, this.output);
        }
        static getDefaults() {
          return Object.assign(Tr.getDefaults(), {envelope: Object.assign(di(wr.getDefaults(), Object.keys(io.getDefaults())), {decay: 0.1, sustain: 0}), noise: Object.assign(di(zo.getDefaults(), Object.keys(jo.getDefaults())), {type: "white"})});
        }
        triggerAttack(t, e = 1) {
          return t = this.toSeconds(t), this.envelope.triggerAttack(t, e), this.noise.start(t), 0 === this.envelope.sustain && this.noise.stop(t + this.toSeconds(this.envelope.attack) + this.toSeconds(this.envelope.decay)), this;
        }
        triggerRelease(t) {
          return t = this.toSeconds(t), this.envelope.triggerRelease(t), this.noise.stop(t + this.toSeconds(this.envelope.release)), this;
        }
        sync() {
          return this._syncState() && (this._syncMethod("triggerAttack", 0), this._syncMethod("triggerRelease", 0)), this;
        }
        triggerAttackRelease(t, e, s = 1) {
          return e = this.toSeconds(e), t = this.toSeconds(t), this.triggerAttack(e, s), this.triggerRelease(e + t), this;
        }
        dispose() {
          return super.dispose(), this.noise.dispose(), this.envelope.dispose(), this;
        }
      }
      const jr = new Set;
      function Lr(t) {
        jr.add(t);
      }
      function zr(t, e) {
        const s = `registerProcessor("${t}", ${e})`;
        jr.add(s);
      }
      class Wr extends io {
        constructor(t) {
          super(t), this.name = "ToneAudioWorklet", this.workletOptions = {}, this.onprocessorerror = Ei;
          const e = URL.createObjectURL(new Blob([Array.from(jr).join("\n")], {type: "text/javascript"})), s = this._audioWorkletName();
          this._dummyGain = this.context.createGain(), this._dummyParam = this._dummyGain.gain, this.context.addAudioWorkletModule(e).then(() => {
            this.disposed || (this._worklet = this.context.createAudioWorkletNode(s, this.workletOptions), this._worklet.onprocessorerror = this.onprocessorerror.bind(this), this.onReady(this._worklet));
          });
        }
        dispose() {
          return super.dispose(), this._dummyGain.disconnect(), this._worklet && (this._worklet.port.postMessage("dispose"), this._worklet.disconnect()), this;
        }
      }
      Lr('\n	/**\n	 * The base AudioWorkletProcessor for use in Tone.js. Works with the {@link ToneAudioWorklet}. \n	 */\n	class ToneAudioWorkletProcessor extends AudioWorkletProcessor {\n\n		constructor(options) {\n			\n			super(options);\n			/**\n			 * If the processor was disposed or not. Keep alive until it\'s disposed.\n			 */\n			this.disposed = false;\n		   	/** \n			 * The number of samples in the processing block\n			 */\n			this.blockSize = 128;\n			/**\n			 * the sample rate\n			 */\n			this.sampleRate = sampleRate;\n\n			this.port.onmessage = (event) => {\n				// when it receives a dispose \n				if (event.data === "dispose") {\n					this.disposed = true;\n				}\n			};\n		}\n	}\n'), Lr("\n	/**\n	 * Abstract class for a single input/output processor. \n	 * has a 'generate' function which processes one sample at a time\n	 */\n	class SingleIOProcessor extends ToneAudioWorkletProcessor {\n\n		constructor(options) {\n			super(Object.assign(options, {\n				numberOfInputs: 1,\n				numberOfOutputs: 1\n			}));\n			/**\n			 * Holds the name of the parameter and a single value of that\n			 * parameter at the current sample\n			 * @type { [name: string]: number }\n			 */\n			this.params = {}\n		}\n\n		/**\n		 * Generate an output sample from the input sample and parameters\n		 * @abstract\n		 * @param input number\n		 * @param channel number\n		 * @param parameters { [name: string]: number }\n		 * @returns number\n		 */\n		generate(){}\n\n		/**\n		 * Update the private params object with the \n		 * values of the parameters at the given index\n		 * @param parameters { [name: string]: Float32Array },\n		 * @param index number\n		 */\n		updateParams(parameters, index) {\n			for (const paramName in parameters) {\n				const param = parameters[paramName];\n				if (param.length > 1) {\n					this.params[paramName] = parameters[paramName][index];\n				} else {\n					this.params[paramName] = parameters[paramName][0];\n				}\n			}\n		}\n\n		/**\n		 * Process a single frame of the audio\n		 * @param inputs Float32Array[][]\n		 * @param outputs Float32Array[][]\n		 */\n		process(inputs, outputs, parameters) {\n			const input = inputs[0];\n			const output = outputs[0];\n			// get the parameter values\n			const channelCount = Math.max(input && input.length || 0, output.length);\n			for (let sample = 0; sample < this.blockSize; sample++) {\n				this.updateParams(parameters, sample);\n				for (let channel = 0; channel < channelCount; channel++) {\n					const inputSample = input && input.length ? input[channel][sample] : 0;\n					output[channel][sample] = this.generate(inputSample, channel, this.params);\n				}\n			}\n			return !this.disposed;\n		}\n	};\n"), Lr("\n	/**\n	 * A multichannel buffer for use within an AudioWorkletProcessor as a delay line\n	 */\n	class DelayLine {\n		\n		constructor(size, channels) {\n			this.buffer = [];\n			this.writeHead = []\n			this.size = size;\n\n			// create the empty channels\n			for (let i = 0; i < channels; i++) {\n				this.buffer[i] = new Float32Array(this.size);\n				this.writeHead[i] = 0;\n			}\n		}\n\n		/**\n		 * Push a value onto the end\n		 * @param channel number\n		 * @param value number\n		 */\n		push(channel, value) {\n			this.writeHead[channel] += 1;\n			if (this.writeHead[channel] > this.size) {\n				this.writeHead[channel] = 0;\n			}\n			this.buffer[channel][this.writeHead[channel]] = value;\n		}\n\n		/**\n		 * Get the recorded value of the channel given the delay\n		 * @param channel number\n		 * @param delay number delay samples\n		 */\n		get(channel, delay) {\n			let readHead = this.writeHead[channel] - Math.floor(delay);\n			if (readHead < 0) {\n				readHead += this.size;\n			}\n			return this.buffer[channel][readHead];\n		}\n	}\n");
      const Br = "feedback-comb-filter";
      zr(Br, '\n	class FeedbackCombFilterWorklet extends SingleIOProcessor {\n\n		constructor(options) {\n			super(options);\n			this.delayLine = new DelayLine(this.sampleRate, options.channelCount || 2);\n		}\n\n		static get parameterDescriptors() {\n			return [{\n				name: "delayTime",\n				defaultValue: 0.1,\n				minValue: 0,\n				maxValue: 1,\n				automationRate: "k-rate"\n			}, {\n				name: "feedback",\n				defaultValue: 0.5,\n				minValue: 0,\n				maxValue: 0.9999,\n				automationRate: "k-rate"\n			}];\n		}\n\n		generate(input, channel, parameters) {\n			const delayedSample = this.delayLine.get(channel, parameters.delayTime * this.sampleRate);\n			this.delayLine.push(channel, input + delayedSample * parameters.feedback);\n			return delayedSample;\n		}\n	}\n');
      class Ur extends Wr {
        constructor() {
          const t = ui(Ur.getDefaults(), arguments, ["delayTime", "resonance"]);
          super(t), this.name = "FeedbackCombFilter", this.input = new ho({context: this.context}), this.output = new ho({context: this.context}), this.delayTime = new no({context: this.context, value: t.delayTime, units: "time", minValue: 0, maxValue: 1, param: this._dummyParam, swappable: true}), this.resonance = new no({context: this.context, value: t.resonance, units: "normalRange", param: this._dummyParam, swappable: true}), Di(this, ["resonance", "delayTime"]);
        }
        _audioWorkletName() {
          return Br;
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {delayTime: 0.1, resonance: 0.5});
        }
        onReady(t) {
          oo(this.input, t, this.output);
          const e = t.parameters.get("delayTime");
          this.delayTime.setParam(e);
          const s = t.parameters.get("feedback");
          this.resonance.setParam(s);
        }
        dispose() {
          return super.dispose(), this.input.dispose(), this.output.dispose(), this.delayTime.dispose(), this.resonance.dispose(), this;
        }
      }
      class Gr extends io {
        constructor() {
          const t = ui(Gr.getDefaults(), arguments, ["frequency", "type"]);
          super(t), this.name = "OnePoleFilter", this._frequency = t.frequency, this._type = t.type, this.input = new ho({context: this.context}), this.output = new ho({context: this.context}), this._createFilter();
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {frequency: 880, type: "lowpass"});
        }
        _createFilter() {
          const t = this._filter, e = this.toFrequency(this._frequency), s = 1 / (2 * Math.PI * e);
          if ("lowpass" === this._type) {
            const t = 1 / (s * this.context.sampleRate), e = t - 1;
            this._filter = this.context.createIIRFilter([t, 0], [1, e]);
          } else {
            const t = 1 / (s * this.context.sampleRate) - 1;
            this._filter = this.context.createIIRFilter([1, -1], [1, t]);
          }
          this.input.chain(this._filter, this.output), t && this.context.setTimeout(() => {
            this.disposed || (this.input.disconnect(t), t.disconnect());
          }, this.blockTime);
        }
        get frequency() {
          return this._frequency;
        }
        set frequency (t) {
          this._frequency = t, this._createFilter();
        }
        get type() {
          return this._type;
        }
        set type (t) {
          this._type = t, this._createFilter();
        }
        getFrequencyResponse(t = 128) {
          const e = new Float32Array(t);
          for (let s = 0; s < t; s++) {
            const n = 19980 * Math.pow(s / t, 2) + 20;
            e[s] = n;
          }
          const s = new Float32Array(t), n = new Float32Array(t);
          return this._filter.getFrequencyResponse(e, s, n), s;
        }
        dispose() {
          return super.dispose(), this.input.dispose(), this.output.dispose(), this._filter.disconnect(), this;
        }
      }
      class Qr extends io {
        constructor() {
          const t = ui(Qr.getDefaults(), arguments, ["delayTime", "resonance", "dampening"]);
          super(t), this.name = "LowpassCombFilter", this._combFilter = this.output = new Ur({context: this.context, delayTime: t.delayTime, resonance: t.resonance}), this.delayTime = this._combFilter.delayTime, this.resonance = this._combFilter.resonance, this._lowpass = this.input = new Gr({context: this.context, frequency: t.dampening, type: "lowpass"}), this._lowpass.connect(this._combFilter);
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {dampening: 3e3, delayTime: 0.1, resonance: 0.5});
        }
        get dampening() {
          return this._lowpass.frequency;
        }
        set dampening (t) {
          this._lowpass.frequency = t;
        }
        dispose() {
          return super.dispose(), this._combFilter.dispose(), this._lowpass.dispose(), this;
        }
      }
      class Zr extends Tr {
        constructor() {
          const t = ui(Zr.getDefaults(), arguments);
          super(t), this.name = "PluckSynth", this._noise = new zo({context: this.context, type: "pink"}), this.attackNoise = t.attackNoise, this._lfcf = new Qr({context: this.context, dampening: t.dampening, resonance: t.resonance}), this.resonance = t.resonance, this.release = t.release, this._noise.connect(this._lfcf), this._lfcf.connect(this.output);
        }
        static getDefaults() {
          return li(Tr.getDefaults(), {attackNoise: 1, dampening: 4e3, resonance: 0.7, release: 1});
        }
        get dampening() {
          return this._lfcf.dampening;
        }
        set dampening (t) {
          this._lfcf.dampening = t;
        }
        triggerAttack(t, e) {
          const s = this.toFrequency(t);
          e = this.toSeconds(e);
          const n = 1 / s;
          return this._lfcf.delayTime.setValueAtTime(n, e), this._noise.start(e), this._noise.stop(e + n * this.attackNoise), this._lfcf.resonance.cancelScheduledValues(e), this._lfcf.resonance.setValueAtTime(this.resonance, e), this;
        }
        triggerRelease(t) {
          return this._lfcf.resonance.linearRampTo(0, this.release, t), this;
        }
        dispose() {
          return super.dispose(), this._noise.dispose(), this._lfcf.dispose(), this;
        }
      }
      class Xr extends Tr {
        constructor() {
          const t = ui(Xr.getDefaults(), arguments, ["voice", "options"]);
          super(t), this.name = "PolySynth", this._availableVoices = [], this._activeVoices = [], this._voices = [], this._gcTimeout = -1, this._averageActiveVoices = 0, this._syncedRelease = t => this.releaseAll(t), Bn(!("number" == typeof t.voice), "DEPRECATED: The polyphony count is no longer the first argument.");
          const e = t.voice.getDefaults();
          this.options = Object.assign(e, t.options), this.voice = t.voice, this.maxPolyphony = t.maxPolyphony, this._dummyVoice = this._getNextAvailableVoice();
          const s = this._voices.indexOf(this._dummyVoice);
          this._voices.splice(s, 1), this._gcTimeout = this.context.setInterval(this._collectGarbage.bind(this), 1);
        }
        static getDefaults() {
          return Object.assign(Tr.getDefaults(), {maxPolyphony: 32, options: {}, voice: Ar});
        }
        get activeVoices() {
          return this._activeVoices.length;
        }
        _makeVoiceAvailable(t) {
          this._availableVoices.push(t);
          const e = this._activeVoices.findIndex(e => e.voice === t);
          this._activeVoices.splice(e, 1);
        }
        _getNextAvailableVoice() {
          if (this._availableVoices.length) return this._availableVoices.shift();
          if (this._voices.length < this.maxPolyphony) {
            const t = new this.voice(Object.assign(this.options, {context: this.context, onsilence: this._makeVoiceAvailable.bind(this)}));
            return Bn(t instanceof Sr, "Voice must extend Monophonic class"), t.connect(this.output), this._voices.push(t), t;
          }
          Kn("Max polyphony exceeded. Note dropped.");
        }
        _collectGarbage() {
          if (this._averageActiveVoices = Math.max(0.95 * this._averageActiveVoices, this.activeVoices), this._availableVoices.length && this._voices.length > Math.ceil(this._averageActiveVoices + 1)) {
            const t = this._availableVoices.shift(), e = this._voices.indexOf(t);
            this._voices.splice(e, 1), this.context.isOffline || t.dispose();
          }
        }
        _triggerAttack(t, e, s) {
          t.forEach(t => {
            const n = new ko(this.context, t).toMidi(), i = this._getNextAvailableVoice();
            i && (i.triggerAttack(t, e, s), this._activeVoices.push({midi: n, voice: i, released: false}), this.log("triggerAttack", t, e));
          });
        }
        _triggerRelease(t, e) {
          t.forEach(t => {
            const s = new ko(this.context, t).toMidi(), n = this._activeVoices.find(({midi: t, released: e}) => t === s && !e);
            n && (n.voice.triggerRelease(e), n.released = true, this.log("triggerRelease", t, e));
          });
        }
        _scheduleEvent(t, e, s, n) {
          Bn(!this.disposed, "Synth was already disposed"), s <= this.now() ? "attack" === t ? this._triggerAttack(e, s, n) : this._triggerRelease(e, s) : this.context.setTimeout(() => {
            this.disposed || this._scheduleEvent(t, e, s, n);
          }, s - this.now());
        }
        triggerAttack(t, e, s) {
          Array.isArray(t) || (t = [t]);
          const n = this.toSeconds(e);
          return this._scheduleEvent("attack", t, n, s), this;
        }
        triggerRelease(t, e) {
          Array.isArray(t) || (t = [t]);
          const s = this.toSeconds(e);
          return this._scheduleEvent("release", t, s), this;
        }
        triggerAttackRelease(t, e, s, n) {
          const i = this.toSeconds(s);
          if (this.triggerAttack(t, i, n), Array.isArray(e)) {
            Bn(Array.isArray(t), "If the duration is an array, the notes must also be an array");
            for (let s = 0; s < t.length; s++) {
              const n = e[Math.min(s, e.length - 1)], o = this.toSeconds(n);
              Bn(o > 0, "The duration must be greater than 0"), this.triggerRelease(t[s], i + o);
            }
          } else {
            const s = this.toSeconds(e);
            Bn(s > 0, "The duration must be greater than 0"), this.triggerRelease(t, i + s);
          }
          return this;
        }
        sync() {
          return this._syncState() && (this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 1), this.context.transport.on("stop", this._syncedRelease), this.context.transport.on("pause", this._syncedRelease), this.context.transport.on("loopEnd", this._syncedRelease)), this;
        }
        set(t) {
          const e = di(t, ["onsilence", "context"]);
          return this.options = li(this.options, e), this._voices.forEach(t => t.set(e)), this._dummyVoice.set(e), this;
        }
        get() {
          return this._dummyVoice.get();
        }
        releaseAll(t) {
          const e = this.toSeconds(t);
          return this._activeVoices.forEach(({voice: t}) => {
            t.triggerRelease(e);
          }), this;
        }
        dispose() {
          return super.dispose(), this._dummyVoice.dispose(), this._voices.forEach(t => t.dispose()), this._activeVoices = [], this._availableVoices = [], this.context.clearInterval(this._gcTimeout), this;
        }
      }
      class Yr extends Tr {
        constructor() {
          const t = ui(Yr.getDefaults(), arguments, ["urls", "onload", "baseUrl"], "urls");
          super(t), this.name = "Sampler", this._activeSources = new Map;
          const e = {};
          Object.keys(t.urls).forEach(s => {
            const n = parseInt(s, 10);
            if (Bn("string" == typeof s && /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(s) || "number" == typeof n && isFinite(n), `url key is neither a note or midi pitch: ${s}`), "string" == typeof s && /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(s)) {
              const n = new Yi(this.context, s).toMidi();
              e[n] = t.urls[s];
            } else "number" == typeof n && isFinite(n) && (e[n] = t.urls[n]);
          }), this._buffers = new So({urls: e, onload: t.onload, baseUrl: t.baseUrl, onerror: t.onerror}), this.attack = t.attack, this.release = t.release, this.curve = t.curve, this._buffers.loaded && Promise.resolve().then(t.onload);
        }
        static getDefaults() {
          return Object.assign(Tr.getDefaults(), {attack: 0, baseUrl: "", curve: "exponential", onload: Ei, onerror: Ei, release: 0.1, urls: {}});
        }
        _findClosest(t) {
          let e = 0;
          for (; e < 96;) {
            if (this._buffers.has(t + e)) return -e;
            if (this._buffers.has(t - e)) return e;
            e++;
          }
          throw new Error(`No available buffers for note: ${t}`);
        }
        triggerAttack(t, e, s = 1) {
          return this.log("triggerAttack", t, e, s), Array.isArray(t) || (t = [t]), t.forEach(t => {
            const n = 69 + 12 * Math.log2(new Yi(this.context, t).toFrequency() / Wi), i = Math.round(n), o = n - i, r = this._findClosest(i), a = i - r, c = this._buffers.get(a), h = Math.pow(2, (r + o) / 12), l = new Lo({url: c, context: this.context, curve: this.curve, fadeIn: this.attack, fadeOut: this.release, playbackRate: h}).connect(this.output);
            l.start(e, 0, c.duration / h, s), Array.isArray(this._activeSources.get(i)) || this._activeSources.set(i, []), this._activeSources.get(i).push(l), l.onended = () => {
              if (this._activeSources && this._activeSources.has(i)) {
                const t = this._activeSources.get(i), e = t.indexOf(l);
                -1 !== e && t.splice(e, 1);
              }
            };
          }), this;
        }
        triggerRelease(t, e) {
          return this.log("triggerRelease", t, e), Array.isArray(t) || (t = [t]), t.forEach(t => {
            const s = new Yi(this.context, t).toMidi();
            if (this._activeSources.has(s) && this._activeSources.get(s).length) {
              const t = this._activeSources.get(s);
              e = this.toSeconds(e), t.forEach(t => {
                t.stop(e);
              }), this._activeSources.set(s, []);
            }
          }), this;
        }
        releaseAll(t) {
          const e = this.toSeconds(t);
          return this._activeSources.forEach(t => {
            for (; t.length;) t.shift().stop(e);
          }), this;
        }
        sync() {
          return this._syncState() && (this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 1)), this;
        }
        triggerAttackRelease(t, e, s, n = 1) {
          const i = this.toSeconds(s);
          return this.triggerAttack(t, i, n), Array.isArray(e) ? (Bn(Array.isArray(t), "notes must be an array when duration is array"), t.forEach((t, s) => {
            const n = e[Math.min(s, e.length - 1)];
            this.triggerRelease(t, i + this.toSeconds(n));
          })) : this.triggerRelease(t, i + this.toSeconds(e)), this;
        }
        add(t, e, s) {
          if (Bn("string" == typeof t && /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(t) || isFinite(t), `note must be a pitch or midi: ${t}`), "string" == typeof t && /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(t)) {
            const n = new Yi(this.context, t).toMidi();
            this._buffers.add(n, e, s);
          } else this._buffers.add(t, e, s);
          return this;
        }
        get loaded() {
          return this._buffers.loaded;
        }
        dispose() {
          return super.dispose(), this._buffers.dispose(), this._activeSources.forEach(t => {
            t.forEach(t => t.dispose());
          }), this._activeSources.clear(), this;
        }
      }
      si([hr(0)], Yr.prototype, "attack", undefined), si([hr(0)], Yr.prototype, "release", undefined);
      class $r extends eo {
        constructor() {
          const t = ui($r.getDefaults(), arguments, ["callback", "value"]);
          super(t), this.name = "ToneEvent", this._state = new so("stopped"), this._startOffset = 0, this._loop = t.loop, this.callback = t.callback, this.value = t.value, this._loopStart = this.toTicks(t.loopStart), this._loopEnd = this.toTicks(t.loopEnd), this._playbackRate = t.playbackRate, this._probability = t.probability, this._humanize = t.humanize, this.mute = t.mute, this._playbackRate = t.playbackRate, this._state.increasing = true, this._rescheduleEvents();
        }
        static getDefaults() {
          return Object.assign(eo.getDefaults(), {callback: Ei, humanize: false, loop: false, loopEnd: "1m", loopStart: 0, mute: false, playbackRate: 1, probability: 1, value: null});
        }
        _rescheduleEvents(t = -1) {
          this._state.forEachFrom(t, t => {
            let e;
            if ("started" === t.state) {
              -1 !== t.id && this.context.transport.clear(t.id);
              const s = t.time + Math.round(this.startOffset / this._playbackRate);
              if (true === this._loop || "number" == typeof this._loop && this._loop > 1) {
                e = Infinity, "number" == typeof this._loop && (e = this._loop * this._getLoopDuration());
                const n = this._state.getAfter(s);
                null !== n && (e = Math.min(e, n.time - s)), e !== Infinity && (e = new Co(this.context, e));
                const i = new Co(this.context, this._getLoopDuration());
                t.id = this.context.transport.scheduleRepeat(this._tick.bind(this), i, new Co(this.context, s), e);
              } else t.id = this.context.transport.schedule(this._tick.bind(this), new Co(this.context, s));
            }
          });
        }
        get state() {
          return this._state.getValueAtTime(this.context.transport.ticks);
        }
        get startOffset() {
          return this._startOffset;
        }
        set startOffset (t) {
          this._startOffset = t;
        }
        get probability() {
          return this._probability;
        }
        set probability (t) {
          this._probability = t;
        }
        get humanize() {
          return this._humanize;
        }
        set humanize (t) {
          this._humanize = t;
        }
        start(t) {
          const e = this.toTicks(t);
          return "stopped" === this._state.getValueAtTime(e) && (this._state.add({id: -1, state: "started", time: e}), this._rescheduleEvents(e)), this;
        }
        stop(t) {
          this.cancel(t);
          const e = this.toTicks(t);
          if ("started" === this._state.getValueAtTime(e)) {
            this._state.setStateAtTime("stopped", e, {id: -1});
            const t = this._state.getBefore(e);
            let s = e;
            null !== t && (s = t.time), this._rescheduleEvents(s);
          }
          return this;
        }
        cancel(t) {
          t = pi(t, -Infinity);
          const e = this.toTicks(t);
          return this._state.forEachFrom(e, t => {
            this.context.transport.clear(t.id);
          }), this._state.cancel(e), this;
        }
        _tick(t) {
          const e = this.context.transport.getTicksAtTime(t);
          if (!this.mute && "started" === this._state.getValueAtTime(e)) {
            if (this.probability < 1 && Math.random() > this.probability) return;
            if (this.humanize) {
              let e = 0.02;
              "boolean" == typeof this.humanize || (e = this.toSeconds(this.humanize)), t += (2 * Math.random() - 1) * e;
            }
            this.callback(t, this.value);
          }
        }
        _getLoopDuration() {
          return (this._loopEnd - this._loopStart) / this._playbackRate;
        }
        get loop() {
          return this._loop;
        }
        set loop (t) {
          this._loop = t, this._rescheduleEvents();
        }
        get playbackRate() {
          return this._playbackRate;
        }
        set playbackRate (t) {
          this._playbackRate = t, this._rescheduleEvents();
        }
        get loopEnd() {
          return new Co(this.context, this._loopEnd).toSeconds();
        }
        set loopEnd (t) {
          this._loopEnd = this.toTicks(t), this._loop && this._rescheduleEvents();
        }
        get loopStart() {
          return new Co(this.context, this._loopStart).toSeconds();
        }
        set loopStart (t) {
          this._loopStart = this.toTicks(t), this._loop && this._rescheduleEvents();
        }
        get progress() {
          if (this._loop) {
            const t = this.context.transport.ticks, e = this._state.get(t);
            if (null !== e && "started" === e.state) {
              const s = this._getLoopDuration();
              return (t - e.time) % s / s;
            }
            return 0;
          }
          return 0;
        }
        dispose() {
          return super.dispose(), this.cancel(), this._state.dispose(), this;
        }
      }
      class Hr extends eo {
        constructor() {
          const t = ui(Hr.getDefaults(), arguments, ["callback", "interval"]);
          super(t), this.name = "Loop", this._event = new $r({context: this.context, callback: this._tick.bind(this), loop: true, loopEnd: t.interval, playbackRate: t.playbackRate, probability: t.probability, humanize: t.humanize}), this.callback = t.callback, this.iterations = t.iterations;
        }
        static getDefaults() {
          return Object.assign(eo.getDefaults(), {interval: "4n", callback: Ei, playbackRate: 1, iterations: Infinity, probability: 1, mute: false, humanize: false});
        }
        start(t) {
          return this._event.start(t), this;
        }
        stop(t) {
          return this._event.stop(t), this;
        }
        cancel(t) {
          return this._event.cancel(t), this;
        }
        _tick(t) {
          this.callback(t);
        }
        get state() {
          return this._event.state;
        }
        get progress() {
          return this._event.progress;
        }
        get interval() {
          return this._event.loopEnd;
        }
        set interval (t) {
          this._event.loopEnd = t;
        }
        get playbackRate() {
          return this._event.playbackRate;
        }
        set playbackRate (t) {
          this._event.playbackRate = t;
        }
        get humanize() {
          return this._event.humanize;
        }
        set humanize (t) {
          this._event.humanize = t;
        }
        get probability() {
          return this._event.probability;
        }
        set probability (t) {
          this._event.probability = t;
        }
        get mute() {
          return this._event.mute;
        }
        set mute (t) {
          this._event.mute = t;
        }
        get iterations() {
          return true === this._event.loop ? Infinity : this._event.loop;
        }
        set iterations (t) {
          this._event.loop = t === Infinity || t;
        }
        dispose() {
          return super.dispose(), this._event.dispose(), this;
        }
      }
      class Jr extends $r {
        constructor() {
          const t = ui(Jr.getDefaults(), arguments, ["callback", "events"]);
          super(t), this.name = "Part", this._state = new so("stopped"), this._events = new Set, this._state.increasing = true, t.events.forEach(t => {
            Array.isArray(t) ? this.add(t[0], t[1]) : this.add(t);
          });
        }
        static getDefaults() {
          return Object.assign($r.getDefaults(), {events: []});
        }
        start(t, e) {
          const s = this.toTicks(t);
          if ("started" !== this._state.getValueAtTime(s)) {
            e = pi(e, this._loop ? this._loopStart : 0), e = this._loop ? pi(e, this._loopStart) : pi(e, 0);
            const t = this.toTicks(e);
            this._state.add({id: -1, offset: t, state: "started", time: s}), this._forEach(e => {
              this._startNote(e, s, t);
            });
          }
          return this;
        }
        _startNote(t, e, s) {
          e -= s, this._loop ? t.startOffset >= this._loopStart && t.startOffset < this._loopEnd ? (t.startOffset < s && (e += this._getLoopDuration()), t.start(new Co(this.context, e))) : t.startOffset < this._loopStart && t.startOffset >= s && (t.loop = false, t.start(new Co(this.context, e))) : t.startOffset >= s && t.start(new Co(this.context, e));
        }
        get startOffset() {
          return this._startOffset;
        }
        set startOffset (t) {
          this._startOffset = t, this._forEach(t => {
            t.startOffset += this._startOffset;
          });
        }
        stop(t) {
          const e = this.toTicks(t);
          return this._state.cancel(e), this._state.setStateAtTime("stopped", e), this._forEach(e => {
            e.stop(t);
          }), this;
        }
        at(t, e) {
          const s = new Ki(this.context, t).toTicks(), n = new Co(this.context, 1).toSeconds(), i = this._events.values();
          let o = i.next();
          for (; !o.done;) {
            const t = o.value;
            if (Math.abs(s - t.startOffset) < n) return undefined !== e && (t.value = e), t;
            o = i.next();
          }
          return undefined !== e ? (this.add(t, e), this.at(t)) : null;
        }
        add(t, e) {
          t instanceof Object && Reflect.has(t, "time") && (t = (e = t).time);
          const s = this.toTicks(t);
          let n;
          return e instanceof $r ? (n = e, n.callback = this._tick.bind(this)) : n = new $r({callback: this._tick.bind(this), context: this.context, value: e}), n.startOffset = s, n.set({humanize: this.humanize, loop: this.loop, loopEnd: this.loopEnd, loopStart: this.loopStart, playbackRate: this.playbackRate, probability: this.probability}), this._events.add(n), this._restartEvent(n), this;
        }
        _restartEvent(t) {
          this._state.forEach(e => {
            "started" === e.state ? this._startNote(t, e.time, e.offset) : t.stop(new Co(this.context, e.time));
          });
        }
        remove(t, e) {
          return "[object Object]" === Object.prototype.toString.call(t) && t.constructor === Object && t.hasOwnProperty("time") && (t = (e = t).time), t = this.toTicks(t), this._events.forEach(s => {
            s.startOffset === t && (undefined === e || undefined !== e && s.value === e) && (this._events.delete(s), s.dispose());
          }), this;
        }
        clear() {
          return this._forEach(t => t.dispose()), this._events.clear(), this;
        }
        cancel(t) {
          return this._forEach(e => e.cancel(t)), this._state.cancel(this.toTicks(t)), this;
        }
        _forEach(t) {
          return this._events && this._events.forEach(e => {
            e instanceof Jr ? e._forEach(t) : t(e);
          }), this;
        }
        _setAll(t, e) {
          this._forEach(s => {
            s[t] = e;
          });
        }
        _tick(t, e) {
          this.mute || this.callback(t, e);
        }
        _testLoopBoundries(t) {
          this._loop && (t.startOffset < this._loopStart || t.startOffset >= this._loopEnd) ? t.cancel(0) : "stopped" === t.state && this._restartEvent(t);
        }
        get probability() {
          return this._probability;
        }
        set probability (t) {
          this._probability = t, this._setAll("probability", t);
        }
        get humanize() {
          return this._humanize;
        }
        set humanize (t) {
          this._humanize = t, this._setAll("humanize", t);
        }
        get loop() {
          return this._loop;
        }
        set loop (t) {
          this._loop = t, this._forEach(e => {
            e.loopStart = this.loopStart, e.loopEnd = this.loopEnd, e.loop = t, this._testLoopBoundries(e);
          });
        }
        get loopEnd() {
          return new Co(this.context, this._loopEnd).toSeconds();
        }
        set loopEnd (t) {
          this._loopEnd = this.toTicks(t), this._loop && this._forEach(e => {
            e.loopEnd = t, this._testLoopBoundries(e);
          });
        }
        get loopStart() {
          return new Co(this.context, this._loopStart).toSeconds();
        }
        set loopStart (t) {
          this._loopStart = this.toTicks(t), this._loop && this._forEach(t => {
            t.loopStart = this.loopStart, this._testLoopBoundries(t);
          });
        }
        get playbackRate() {
          return this._playbackRate;
        }
        set playbackRate (t) {
          this._playbackRate = t, this._setAll("playbackRate", t);
        }
        get length() {
          return this._events.size;
        }
        dispose() {
          return super.dispose(), this.clear(), this;
        }
      }
      function* Kr(t) {
        let e = 0;
        for (; e < t;) e = Math.max(Math.min(e, t - 1), 0), yield e, e++;
      }
      function* ta(t) {
        let e = t - 1;
        for (; e >= 0;) e = Math.max(Math.min(e, t - 1), 0), yield e, e--;
      }
      function* ea(t, e) {
        for (;;) yield* e(t);
      }
      function* sa(t, e) {
        let s = e ? 0 : t - 1;
        for (;;) s = Math.max(Math.min(s, t - 1), 0), yield s, e ? (s++, s >= t - 1 && (e = false)) : (s--, s <= 0 && (e = true));
      }
      function* na(t) {
        let e = 0, s = 0;
        for (; e < t;) e = Math.max(Math.min(e, t - 1), 0), yield e, s++, e += s % 2 ? 2 : -1;
      }
      function* ia(t) {
        let e = t - 1, s = 0;
        for (; e >= 0;) e = Math.max(Math.min(e, t - 1), 0), yield e, s++, e += s % 2 ? -2 : 1;
      }
      function* oa(t) {
        const e = [];
        for (let s = 0; s < t; s++) e.push(s);
        for (; e.length > 0;) {
          const s = Math.max(Math.min(e.splice(Math.floor(e.length * Math.random()), 1)[0], t - 1), 0);
          yield s;
        }
      }
      function* ra(t, e = "up", s = 0) {
        switch (Bn(t >= 1, "The number of values must be at least one"), e) {
          case "up":
            yield* ea(t, Kr);
          case "down":
            yield* ea(t, ta);
          case "upDown":
            yield* sa(t, true);
          case "downUp":
            yield* sa(t, false);
          case "alternateUp":
            yield* ea(t, na);
          case "alternateDown":
            yield* ea(t, ia);
          case "random":
            yield* function* (t) {
              for (;;) {
                const e = Math.floor(Math.random() * t);
                yield e;
              }
            }(t);
          case "randomOnce":
            yield* ea(t, oa);
          case "randomWalk":
            yield* function* (t) {
              let e = Math.floor(Math.random() * t);
              for (;;) 0 === e ? e++ : e === t - 1 || Math.random() < 0.5 ? e-- : e++, yield e;
            }(t);
        }
      }
      class aa extends Hr {
        constructor() {
          const t = ui(aa.getDefaults(), arguments, ["callback", "values", "pattern"]);
          super(t), this.name = "Pattern", this.callback = t.callback, this._values = t.values, this._pattern = ra(t.values.length, t.pattern), this._type = t.pattern;
        }
        static getDefaults() {
          return Object.assign(Hr.getDefaults(), {pattern: "up", values: [], callback: Ei});
        }
        _tick(t) {
          const e = this._pattern.next();
          this._index = e.value, this._value = this._values[e.value], this.callback(t, this._value);
        }
        get values() {
          return this._values;
        }
        set values (t) {
          this._values = t, this.pattern = this._type;
        }
        get value() {
          return this._value;
        }
        get index() {
          return this._index;
        }
        get pattern() {
          return this._type;
        }
        set pattern (t) {
          this._type = t, this._pattern = ra(this._values.length, this._type);
        }
      }
      class ca extends $r {
        constructor() {
          const t = ui(ca.getDefaults(), arguments, ["callback", "events", "subdivision"]);
          super(t), this.name = "Sequence", this._part = new Jr({callback: this._seqCallback.bind(this), context: this.context}), this._events = [], this._eventsArray = [], this._subdivision = this.toTicks(t.subdivision), this.events = t.events, this.loop = t.loop, this.loopStart = t.loopStart, this.loopEnd = t.loopEnd, this.playbackRate = t.playbackRate, this.probability = t.probability, this.humanize = t.humanize, this.mute = t.mute, this.playbackRate = t.playbackRate;
        }
        static getDefaults() {
          return Object.assign(di($r.getDefaults(), ["value"]), {events: [], loop: true, loopEnd: 0, loopStart: 0, subdivision: "8n"});
        }
        _seqCallback(t, e) {
          null === e || this.mute || this.callback(t, e);
        }
        get events() {
          return this._events;
        }
        set events (t) {
          this.clear(), this._eventsArray = t, this._events = this._createSequence(this._eventsArray), this._eventsUpdated();
        }
        start(t, e) {
          return this._part.start(t, e ? this._indexTime(e) : e), this;
        }
        stop(t) {
          return this._part.stop(t), this;
        }
        get subdivision() {
          return new Co(this.context, this._subdivision).toSeconds();
        }
        _createSequence(t) {
          return new Proxy(t, {get: (t, e) => t[e], set: (t, e, s) => ("string" == typeof e && isFinite(parseInt(e, 10)) && Array.isArray(s) ? t[e] = this._createSequence(s) : t[e] = s, this._eventsUpdated(), true)});
        }
        _eventsUpdated() {
          this._part.clear(), this._rescheduleSequence(this._eventsArray, this._subdivision, this.startOffset), this.loopEnd = this.loopEnd;
        }
        _rescheduleSequence(t, e, s) {
          t.forEach((t, n) => {
            const i = n * e + s;
            if (Array.isArray(t)) this._rescheduleSequence(t, e / t.length, i); else {
              const e = new Co(this.context, i, "i").toSeconds();
              this._part.add(e, t);
            }
          });
        }
        _indexTime(t) {
          return new Co(this.context, t * this._subdivision + this.startOffset).toSeconds();
        }
        clear() {
          return this._part.clear(), this;
        }
        dispose() {
          return super.dispose(), this._part.dispose(), this;
        }
        get loop() {
          return this._part.loop;
        }
        set loop (t) {
          this._part.loop = t;
        }
        get loopStart() {
          return this._loopStart;
        }
        set loopStart (t) {
          this._loopStart = t, this._part.loopStart = this._indexTime(t);
        }
        get loopEnd() {
          return this._loopEnd;
        }
        set loopEnd (t) {
          this._loopEnd = t, this._part.loopEnd = 0 === t ? this._indexTime(this._eventsArray.length) : this._indexTime(t);
        }
        get startOffset() {
          return this._part.startOffset;
        }
        set startOffset (t) {
          this._part.startOffset = t;
        }
        get playbackRate() {
          return this._part.playbackRate;
        }
        set playbackRate (t) {
          this._part.playbackRate = t;
        }
        get probability() {
          return this._part.probability;
        }
        set probability (t) {
          this._part.probability = t;
        }
        get progress() {
          return this._part.progress;
        }
        get humanize() {
          return this._part.humanize;
        }
        set humanize (t) {
          this._part.humanize = t;
        }
        get length() {
          return this._part.length;
        }
      }
      class ha extends io {
        constructor() {
          const t = ui(ha.getDefaults(), arguments, ["fade"]);
          super(t), this.name = "CrossFade", this._panner = this.context.createStereoPanner(), this._split = this.context.createChannelSplitter(2), this._g2a = new fr({context: this.context}), this.a = new ho({context: this.context, gain: 0}), this.b = new ho({context: this.context, gain: 0}), this.output = new ho({context: this.context}), this._internalChannels = [this.a, this.b], this.fade = new po({context: this.context, units: "normalRange", value: t.fade}), Di(this, "fade"), this.context.getConstant(1).connect(this._panner), this._panner.connect(this._split), this._panner.channelCount = 1, this._panner.channelCountMode = "explicit", ro(this._split, this.a.gain, 0), ro(this._split, this.b.gain, 1), this.fade.chain(this._g2a, this._panner.pan), this.a.connect(this.output), this.b.connect(this.output);
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {fade: 0.5});
        }
        dispose() {
          return super.dispose(), this.a.dispose(), this.b.dispose(), this.output.dispose(), this.fade.dispose(), this._g2a.dispose(), this._panner.disconnect(), this._split.disconnect(), this;
        }
      }
      class la extends io {
        constructor(t) {
          super(t), this.name = "Effect", this._dryWet = new ha({context: this.context}), this.wet = this._dryWet.fade, this.effectSend = new ho({context: this.context}), this.effectReturn = new ho({context: this.context}), this.input = new ho({context: this.context}), this.output = this._dryWet, this.input.fan(this._dryWet.a, this.effectSend), this.effectReturn.connect(this._dryWet.b), this.wet.setValueAtTime(t.wet, 0), this._internalChannels = [this.effectReturn, this.effectSend], Di(this, "wet");
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {wet: 1});
        }
        connectEffect(t) {
          return this._internalChannels.push(t), this.effectSend.chain(t, this.effectReturn), this;
        }
        dispose() {
          return super.dispose(), this._dryWet.dispose(), this.effectSend.dispose(), this.effectReturn.dispose(), this.wet.dispose(), this;
        }
      }
      class ua extends la {
        constructor(t) {
          super(t), this.name = "LFOEffect", this._lfo = new ar({context: this.context, frequency: t.frequency, amplitude: t.depth}), this.depth = this._lfo.amplitude, this.frequency = this._lfo.frequency, this.type = t.type, Di(this, ["frequency", "depth"]);
        }
        static getDefaults() {
          return Object.assign(la.getDefaults(), {frequency: 1, type: "sine", depth: 1});
        }
        start(t) {
          return this._lfo.start(t), this;
        }
        stop(t) {
          return this._lfo.stop(t), this;
        }
        sync() {
          return this._lfo.sync(), this;
        }
        unsync() {
          return this._lfo.unsync(), this;
        }
        get type() {
          return this._lfo.type;
        }
        set type (t) {
          this._lfo.type = t;
        }
        dispose() {
          return super.dispose(), this._lfo.dispose(), this.frequency.dispose(), this.depth.dispose(), this;
        }
      }
      class pa extends ua {
        constructor() {
          const t = ui(pa.getDefaults(), arguments, ["frequency", "baseFrequency", "octaves"]);
          super(t), this.name = "AutoFilter", this.filter = new Mr(Object.assign(t.filter, {context: this.context})), this.connectEffect(this.filter), this._lfo.connect(this.filter.frequency), this.octaves = t.octaves, this.baseFrequency = t.baseFrequency;
        }
        static getDefaults() {
          return Object.assign(ua.getDefaults(), {baseFrequency: 200, octaves: 2.6, filter: {type: "lowpass", rolloff: -12, Q: 1}});
        }
        get baseFrequency() {
          return this._lfo.min;
        }
        set baseFrequency (t) {
          this._lfo.min = this.toFrequency(t), this.octaves = this._octaves;
        }
        get octaves() {
          return this._octaves;
        }
        set octaves (t) {
          this._octaves = t, this._lfo.max = this._lfo.min * Math.pow(2, t);
        }
        dispose() {
          return super.dispose(), this.filter.dispose(), this;
        }
      }
      class da extends io {
        constructor() {
          const t = ui(da.getDefaults(), arguments, ["pan"]);
          super(t), this.name = "Panner", this._panner = this.context.createStereoPanner(), this.input = this._panner, this.output = this._panner, this.pan = new no({context: this.context, param: this._panner.pan, value: t.pan, minValue: -1, maxValue: 1}), this._panner.channelCount = t.channelCount, this._panner.channelCountMode = "explicit", Di(this, "pan");
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {pan: 0, channelCount: 1});
        }
        dispose() {
          return super.dispose(), this._panner.disconnect(), this.pan.dispose(), this;
        }
      }
      class fa extends ua {
        constructor() {
          const t = ui(fa.getDefaults(), arguments, ["frequency"]);
          super(t), this.name = "AutoPanner", this._panner = new da({context: this.context, channelCount: t.channelCount}), this.connectEffect(this._panner), this._lfo.connect(this._panner.pan), this._lfo.min = -1, this._lfo.max = 1;
        }
        static getDefaults() {
          return Object.assign(ua.getDefaults(), {channelCount: 1});
        }
        dispose() {
          return super.dispose(), this._panner.dispose(), this;
        }
      }
      class _a extends io {
        constructor() {
          const t = ui(_a.getDefaults(), arguments, ["smoothing"]);
          super(t), this.name = "Follower", this._abs = this.input = new dr({context: this.context}), this._lowpass = this.output = new Gr({context: this.context, frequency: 1 / this.toSeconds(t.smoothing), type: "lowpass"}), this._abs.connect(this._lowpass), this._smoothing = t.smoothing;
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {smoothing: 0.05});
        }
        get smoothing() {
          return this._smoothing;
        }
        set smoothing (t) {
          this._smoothing = t, this._lowpass.frequency = 1 / this.toSeconds(this.smoothing);
        }
        dispose() {
          return super.dispose(), this._abs.dispose(), this._lowpass.dispose(), this;
        }
      }
      class ma extends la {
        constructor() {
          const t = ui(ma.getDefaults(), arguments, ["baseFrequency", "octaves", "sensitivity"]);
          super(t), this.name = "AutoWah", this._follower = new _a({context: this.context, smoothing: t.follower}), this._sweepRange = new yr({context: this.context, min: 0, max: 1, exponent: 0.5}), this._baseFrequency = this.toFrequency(t.baseFrequency), this._octaves = t.octaves, this._inputBoost = new ho({context: this.context}), this._bandpass = new Mr({context: this.context, rolloff: -48, frequency: 0, Q: t.Q}), this._peaking = new Mr({context: this.context, type: "peaking"}), this._peaking.gain.value = t.gain, this.gain = this._peaking.gain, this.Q = this._bandpass.Q, this.effectSend.chain(this._inputBoost, this._follower, this._sweepRange), this._sweepRange.connect(this._bandpass.frequency), this._sweepRange.connect(this._peaking.frequency), this.effectSend.chain(this._bandpass, this._peaking, this.effectReturn), this._setSweepRange(), this.sensitivity = t.sensitivity, Di(this, ["gain", "Q"]);
        }
        static getDefaults() {
          return Object.assign(la.getDefaults(), {baseFrequency: 100, octaves: 6, sensitivity: 0, Q: 2, gain: 2, follower: 0.2});
        }
        get octaves() {
          return this._octaves;
        }
        set octaves (t) {
          this._octaves = t, this._setSweepRange();
        }
        get follower() {
          return this._follower.smoothing;
        }
        set follower (t) {
          this._follower.smoothing = t;
        }
        get baseFrequency() {
          return this._baseFrequency;
        }
        set baseFrequency (t) {
          this._baseFrequency = this.toFrequency(t), this._setSweepRange();
        }
        get sensitivity() {
          return Math.log(1 / this._inputBoost.gain.value) / Math.LN10 * 20;
        }
        set sensitivity (t) {
          this._inputBoost.gain.value = 1 / Math.pow(10, t / 20);
        }
        _setSweepRange() {
          this._sweepRange.min = this._baseFrequency, this._sweepRange.max = Math.min(this._baseFrequency * Math.pow(2, this._octaves), this.context.sampleRate / 2);
        }
        dispose() {
          return super.dispose(), this._follower.dispose(), this._sweepRange.dispose(), this._bandpass.dispose(), this._peaking.dispose(), this._inputBoost.dispose(), this;
        }
      }
      const ga = "bit-crusher";
      zr(ga, "\n	class BitCrusherWorklet extends SingleIOProcessor {\n\n		static get parameterDescriptors() {\n			return [{\n				name: \"bits\",\n				defaultValue: 12,\n				minValue: 1,\n				maxValue: 16,\n				automationRate: 'k-rate'\n			}];\n		}\n\n		generate(input, _channel, parameters) {\n			const step = Math.pow(0.5, parameters.bits - 1);\n			const val = step * Math.floor(input / step + 0.5);\n			return val;\n		}\n	}\n");
      class va extends la {
        constructor() {
          const t = ui(va.getDefaults(), arguments, ["bits"]);
          super(t), this.name = "BitCrusher", this._bitCrusherWorklet = new ya({context: this.context, bits: t.bits}), this.connectEffect(this._bitCrusherWorklet), this.bits = this._bitCrusherWorklet.bits;
        }
        static getDefaults() {
          return Object.assign(la.getDefaults(), {bits: 4});
        }
        dispose() {
          return super.dispose(), this._bitCrusherWorklet.dispose(), this;
        }
      }
      class ya extends Wr {
        constructor() {
          const t = ui(ya.getDefaults(), arguments);
          super(t), this.name = "BitCrusherWorklet", this.input = new ho({context: this.context}), this.output = new ho({context: this.context}), this.bits = new no({context: this.context, value: t.bits, units: "positive", minValue: 1, maxValue: 16, param: this._dummyParam, swappable: true});
        }
        static getDefaults() {
          return Object.assign(Wr.getDefaults(), {bits: 12});
        }
        _audioWorkletName() {
          return ga;
        }
        onReady(t) {
          oo(this.input, t, this.output);
          const e = t.parameters.get("bits");
          this.bits.setParam(e);
        }
        dispose() {
          return super.dispose(), this.input.dispose(), this.output.dispose(), this.bits.dispose(), this;
        }
      }
      class xa extends la {
        constructor() {
          const t = ui(xa.getDefaults(), arguments, ["order"]);
          super(t), this.name = "Chebyshev", this._shaper = new Io({context: this.context, length: 4096}), this._order = t.order, this.connectEffect(this._shaper), this.order = t.order, this.oversample = t.oversample;
        }
        static getDefaults() {
          return Object.assign(la.getDefaults(), {order: 1, oversample: "none"});
        }
        _getCoefficient(t, e, s) {
          return s.has(e) || (0 === e ? s.set(e, 0) : 1 === e ? s.set(e, t) : s.set(e, 2 * t * this._getCoefficient(t, e - 1, s) - this._getCoefficient(t, e - 2, s))), s.get(e);
        }
        get order() {
          return this._order;
        }
        set order (t) {
          Bn(Number.isInteger(t), "'order' must be an integer"), this._order = t, this._shaper.setMap(e => this._getCoefficient(e, t, new Map));
        }
        get oversample() {
          return this._shaper.oversample;
        }
        set oversample (t) {
          this._shaper.oversample = t;
        }
        dispose() {
          return super.dispose(), this._shaper.dispose(), this;
        }
      }
      class wa extends io {
        constructor() {
          const t = ui(wa.getDefaults(), arguments, ["channels"]);
          super(t), this.name = "Split", this._splitter = this.input = this.output = this.context.createChannelSplitter(t.channels), this._internalChannels = [this._splitter];
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {channels: 2});
        }
        dispose() {
          return super.dispose(), this._splitter.disconnect(), this;
        }
      }
      class ba extends io {
        constructor() {
          const t = ui(ba.getDefaults(), arguments, ["channels"]);
          super(t), this.name = "Merge", this._merger = this.output = this.input = this.context.createChannelMerger(t.channels);
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {channels: 2});
        }
        dispose() {
          return super.dispose(), this._merger.disconnect(), this;
        }
      }
      class Ta extends io {
        constructor(t) {
          super(t), this.name = "StereoEffect", this.input = new ho({context: this.context}), this.input.channelCount = 2, this.input.channelCountMode = "explicit", this._dryWet = this.output = new ha({context: this.context, fade: t.wet}), this.wet = this._dryWet.fade, this._split = new wa({context: this.context, channels: 2}), this._merge = new ba({context: this.context, channels: 2}), this.input.connect(this._split), this.input.connect(this._dryWet.a), this._merge.connect(this._dryWet.b), Di(this, ["wet"]);
        }
        connectEffectLeft(...t) {
          this._split.connect(t[0], 0, 0), oo(...t), ro(t[t.length - 1], this._merge, 0, 0);
        }
        connectEffectRight(...t) {
          this._split.connect(t[0], 1, 0), oo(...t), ro(t[t.length - 1], this._merge, 0, 1);
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {wet: 1});
        }
        dispose() {
          return super.dispose(), this._dryWet.dispose(), this._split.dispose(), this._merge.dispose(), this;
        }
      }
      class Sa extends Ta {
        constructor(t) {
          super(t), this.feedback = new po({context: this.context, value: t.feedback, units: "normalRange"}), this._feedbackL = new ho({context: this.context}), this._feedbackR = new ho({context: this.context}), this._feedbackSplit = new wa({context: this.context, channels: 2}), this._feedbackMerge = new ba({context: this.context, channels: 2}), this._merge.connect(this._feedbackSplit), this._feedbackMerge.connect(this._split), this._feedbackSplit.connect(this._feedbackL, 0, 0), this._feedbackL.connect(this._feedbackMerge, 0, 0), this._feedbackSplit.connect(this._feedbackR, 1, 0), this._feedbackR.connect(this._feedbackMerge, 0, 1), this.feedback.fan(this._feedbackL.gain, this._feedbackR.gain), Di(this, ["feedback"]);
        }
        static getDefaults() {
          return Object.assign(Ta.getDefaults(), {feedback: 0.5});
        }
        dispose() {
          return super.dispose(), this.feedback.dispose(), this._feedbackL.dispose(), this._feedbackR.dispose(), this._feedbackSplit.dispose(), this._feedbackMerge.dispose(), this;
        }
      }
      class ka extends Sa {
        constructor() {
          const t = ui(ka.getDefaults(), arguments, ["frequency", "delayTime", "depth"]);
          super(t), this.name = "Chorus", this._depth = t.depth, this._delayTime = t.delayTime / 1e3, this._lfoL = new ar({context: this.context, frequency: t.frequency, min: 0, max: 1}), this._lfoR = new ar({context: this.context, frequency: t.frequency, min: 0, max: 1, phase: 180}), this._delayNodeL = new yo({context: this.context}), this._delayNodeR = new yo({context: this.context}), this.frequency = this._lfoL.frequency, Di(this, ["frequency"]), this._lfoL.frequency.connect(this._lfoR.frequency), this.connectEffectLeft(this._delayNodeL), this.connectEffectRight(this._delayNodeR), this._lfoL.connect(this._delayNodeL.delayTime), this._lfoR.connect(this._delayNodeR.delayTime), this.depth = this._depth, this.type = t.type, this.spread = t.spread;
        }
        static getDefaults() {
          return Object.assign(Sa.getDefaults(), {frequency: 1.5, delayTime: 3.5, depth: 0.7, type: "sine", spread: 180, feedback: 0, wet: 0.5});
        }
        get depth() {
          return this._depth;
        }
        set depth (t) {
          this._depth = t;
          const e = this._delayTime * t;
          this._lfoL.min = Math.max(this._delayTime - e, 0), this._lfoL.max = this._delayTime + e, this._lfoR.min = Math.max(this._delayTime - e, 0), this._lfoR.max = this._delayTime + e;
        }
        get delayTime() {
          return 1e3 * this._delayTime;
        }
        set delayTime (t) {
          this._delayTime = t / 1e3, this.depth = this._depth;
        }
        get type() {
          return this._lfoL.type;
        }
        set type (t) {
          this._lfoL.type = t, this._lfoR.type = t;
        }
        get spread() {
          return this._lfoR.phase - this._lfoL.phase;
        }
        set spread (t) {
          this._lfoL.phase = 90 - t / 2, this._lfoR.phase = t / 2 + 90;
        }
        start(t) {
          return this._lfoL.start(t), this._lfoR.start(t), this;
        }
        stop(t) {
          return this._lfoL.stop(t), this._lfoR.stop(t), this;
        }
        sync() {
          return this._lfoL.sync(), this._lfoR.sync(), this;
        }
        unsync() {
          return this._lfoL.unsync(), this._lfoR.unsync(), this;
        }
        dispose() {
          return super.dispose(), this._lfoL.dispose(), this._lfoR.dispose(), this._delayNodeL.dispose(), this._delayNodeR.dispose(), this.frequency.dispose(), this;
        }
      }
      class Aa extends la {
        constructor() {
          const t = ui(Aa.getDefaults(), arguments, ["distortion"]);
          super(t), this.name = "Distortion", this._shaper = new Io({context: this.context, length: 4096}), this._distortion = t.distortion, this.connectEffect(this._shaper), this.distortion = t.distortion, this.oversample = t.oversample;
        }
        static getDefaults() {
          return Object.assign(la.getDefaults(), {distortion: 0.4, oversample: "none"});
        }
        get distortion() {
          return this._distortion;
        }
        set distortion (t) {
          this._distortion = t;
          const e = 100 * t, s = Math.PI / 180;
          this._shaper.setMap(t => Math.abs(t) < 0.001 ? 0 : (3 + e) * t * 20 * s / (Math.PI + e * Math.abs(t)));
        }
        get oversample() {
          return this._shaper.oversample;
        }
        set oversample (t) {
          this._shaper.oversample = t;
        }
        dispose() {
          return super.dispose(), this._shaper.dispose(), this;
        }
      }
      class Ca extends la {
        constructor(t) {
          super(t), this.name = "FeedbackEffect", this._feedbackGain = new ho({context: this.context, gain: t.feedback, units: "normalRange"}), this.feedback = this._feedbackGain.gain, Di(this, "feedback"), this.effectReturn.chain(this._feedbackGain, this.effectSend);
        }
        static getDefaults() {
          return Object.assign(la.getDefaults(), {feedback: 0.125});
        }
        dispose() {
          return super.dispose(), this._feedbackGain.dispose(), this.feedback.dispose(), this;
        }
      }
      class Oa extends Ca {
        constructor() {
          const t = ui(Oa.getDefaults(), arguments, ["delayTime", "feedback"]);
          super(t), this.name = "FeedbackDelay", this._delayNode = new yo({context: this.context, delayTime: t.delayTime, maxDelay: t.maxDelay}), this.delayTime = this._delayNode.delayTime, this.connectEffect(this._delayNode), Di(this, "delayTime");
        }
        static getDefaults() {
          return Object.assign(Ca.getDefaults(), {delayTime: 0.25, maxDelay: 1});
        }
        dispose() {
          return super.dispose(), this._delayNode.dispose(), this.delayTime.dispose(), this;
        }
      }
      class Da extends io {
        constructor(t) {
          super(t), this.name = "PhaseShiftAllpass", this.input = new ho({context: this.context}), this.output = new ho({context: this.context}), this.offset90 = new ho({context: this.context}), this._bank0 = this._createAllPassFilterBank([0.6923878, 0.9360654322959, 0.988229522686, 0.9987488452737]), this._bank1 = this._createAllPassFilterBank([0.4021921162426, 0.856171088242, 0.9722909545651, 0.9952884791278]), this._oneSampleDelay = this.context.createIIRFilter([0, 1], [1, 0]), oo(this.input, ...this._bank0, this._oneSampleDelay, this.output), oo(this.input, ...this._bank1, this.offset90);
        }
        _createAllPassFilterBank(t) {
          return t.map(t => {
            const e = [[t * t, 0, -1], [1, 0, -t * t]];
            return this.context.createIIRFilter(e[0], e[1]);
          });
        }
        dispose() {
          return super.dispose(), this.input.dispose(), this.output.dispose(), this.offset90.dispose(), this._bank0.forEach(t => t.disconnect()), this._bank1.forEach(t => t.disconnect()), this._oneSampleDelay.disconnect(), this;
        }
      }
      class Ma extends la {
        constructor() {
          const t = ui(Ma.getDefaults(), arguments, ["frequency"]);
          super(t), this.name = "FrequencyShifter", this.frequency = new po({context: this.context, units: "frequency", value: t.frequency, minValue: -this.context.sampleRate / 2, maxValue: this.context.sampleRate / 2}), this._sine = new Zo({context: this.context, type: "sine"}), this._cosine = new Xo({context: this.context, phase: -90, type: "sine"}), this._sineMultiply = new $o({context: this.context}), this._cosineMultiply = new $o({context: this.context}), this._negate = new _r({context: this.context}), this._add = new ir({context: this.context}), this._phaseShifter = new Da({context: this.context}), this.effectSend.connect(this._phaseShifter), this.frequency.fan(this._sine.frequency, this._cosine.frequency), this._phaseShifter.offset90.connect(this._cosineMultiply), this._cosine.connect(this._cosineMultiply.factor), this._phaseShifter.connect(this._sineMultiply), this._sine.connect(this._sineMultiply.factor), this._sineMultiply.connect(this._negate), this._cosineMultiply.connect(this._add), this._negate.connect(this._add.addend), this._add.connect(this.effectReturn);
          const e = this.immediate();
          this._sine.start(e), this._cosine.start(e);
        }
        static getDefaults() {
          return Object.assign(la.getDefaults(), {frequency: 0});
        }
        dispose() {
          return super.dispose(), this.frequency.dispose(), this._add.dispose(), this._cosine.dispose(), this._cosineMultiply.dispose(), this._negate.dispose(), this._phaseShifter.dispose(), this._sine.dispose(), this._sineMultiply.dispose(), this;
        }
      }
      const Ea = [0.03530612244897959, 0.03666666666666667, 0.03380952380952381, 0.03224489795918367, 0.02895691609977324, 0.03074829931972789, 0.026938775510204082, 0.025306122448979593], Ra = [225, 556, 441, 341];
      class qa extends Ta {
        constructor() {
          const t = ui(qa.getDefaults(), arguments, ["roomSize", "dampening"]);
          super(t), this.name = "Freeverb", this._combFilters = [], this._allpassFiltersL = [], this._allpassFiltersR = [], this.roomSize = new po({context: this.context, value: t.roomSize, units: "normalRange"}), this._allpassFiltersL = Ra.map(t => {
            const e = this.context.createBiquadFilter();
            return e.type = "allpass", e.frequency.value = t, e;
          }), this._allpassFiltersR = Ra.map(t => {
            const e = this.context.createBiquadFilter();
            return e.type = "allpass", e.frequency.value = t, e;
          }), this._combFilters = Ea.map((e, s) => {
            const n = new Qr({context: this.context, dampening: t.dampening, delayTime: e});
            return s < Ea.length / 2 ? this.connectEffectLeft(n, ...this._allpassFiltersL) : this.connectEffectRight(n, ...this._allpassFiltersR), this.roomSize.connect(n.resonance), n;
          }), Di(this, ["roomSize"]);
        }
        static getDefaults() {
          return Object.assign(Ta.getDefaults(), {roomSize: 0.7, dampening: 3e3});
        }
        get dampening() {
          return this._combFilters[0].dampening;
        }
        set dampening (t) {
          this._combFilters.forEach(e => e.dampening = t);
        }
        dispose() {
          return super.dispose(), this._allpassFiltersL.forEach(t => t.disconnect()), this._allpassFiltersR.forEach(t => t.disconnect()), this._combFilters.forEach(t => t.dispose()), this.roomSize.dispose(), this;
        }
      }
      const Ia = [0.06748, 0.06404, 0.08212, 0.09004], Fa = [0.773, 0.802, 0.753, 0.733], Va = [347, 113, 37];
      class Na extends Ta {
        constructor() {
          const t = ui(Na.getDefaults(), arguments, ["roomSize"]);
          super(t), this.name = "JCReverb", this._allpassFilters = [], this._feedbackCombFilters = [], this.roomSize = new po({context: this.context, value: t.roomSize, units: "normalRange"}), this._scaleRoomSize = new or({context: this.context, min: -0.733, max: 0.197}), this._allpassFilters = Va.map(t => {
            const e = this.context.createBiquadFilter();
            return e.type = "allpass", e.frequency.value = t, e;
          }), this._feedbackCombFilters = Ia.map((t, e) => {
            const s = new Ur({context: this.context, delayTime: t});
            return this._scaleRoomSize.connect(s.resonance), s.resonance.value = Fa[e], e < Ia.length / 2 ? this.connectEffectLeft(...this._allpassFilters, s) : this.connectEffectRight(...this._allpassFilters, s), s;
          }), this.roomSize.connect(this._scaleRoomSize), Di(this, ["roomSize"]);
        }
        static getDefaults() {
          return Object.assign(Ta.getDefaults(), {roomSize: 0.5});
        }
        dispose() {
          return super.dispose(), this._allpassFilters.forEach(t => t.disconnect()), this._feedbackCombFilters.forEach(t => t.dispose()), this.roomSize.dispose(), this._scaleRoomSize.dispose(), this;
        }
      }
      class Pa extends Sa {
        constructor(t) {
          super(t), this._feedbackL.disconnect(), this._feedbackL.connect(this._feedbackMerge, 0, 1), this._feedbackR.disconnect(), this._feedbackR.connect(this._feedbackMerge, 0, 0), Di(this, ["feedback"]);
        }
      }
      class ja extends Pa {
        constructor() {
          const t = ui(ja.getDefaults(), arguments, ["delayTime", "feedback"]);
          super(t), this.name = "PingPongDelay", this._leftDelay = new yo({context: this.context, maxDelay: t.maxDelay}), this._rightDelay = new yo({context: this.context, maxDelay: t.maxDelay}), this._rightPreDelay = new yo({context: this.context, maxDelay: t.maxDelay}), this.delayTime = new po({context: this.context, units: "time", value: t.delayTime}), this.connectEffectLeft(this._leftDelay), this.connectEffectRight(this._rightPreDelay, this._rightDelay), this.delayTime.fan(this._leftDelay.delayTime, this._rightDelay.delayTime, this._rightPreDelay.delayTime), this._feedbackL.disconnect(), this._feedbackL.connect(this._rightDelay), Di(this, ["delayTime"]);
        }
        static getDefaults() {
          return Object.assign(Pa.getDefaults(), {delayTime: 0.25, maxDelay: 1});
        }
        dispose() {
          return super.dispose(), this._leftDelay.dispose(), this._rightDelay.dispose(), this._rightPreDelay.dispose(), this.delayTime.dispose(), this;
        }
      }
      class La extends Ca {
        constructor() {
          const t = ui(La.getDefaults(), arguments, ["pitch"]);
          super(t), this.name = "PitchShift", this._frequency = new po({context: this.context}), this._delayA = new yo({maxDelay: 1, context: this.context}), this._lfoA = new ar({context: this.context, min: 0, max: 0.1, type: "sawtooth"}).connect(this._delayA.delayTime), this._delayB = new yo({maxDelay: 1, context: this.context}), this._lfoB = new ar({context: this.context, min: 0, max: 0.1, type: "sawtooth", phase: 180}).connect(this._delayB.delayTime), this._crossFade = new ha({context: this.context}), this._crossFadeLFO = new ar({context: this.context, min: 0, max: 1, type: "triangle", phase: 90}).connect(this._crossFade.fade), this._feedbackDelay = new yo({delayTime: t.delayTime, context: this.context}), this.delayTime = this._feedbackDelay.delayTime, Di(this, "delayTime"), this._pitch = t.pitch, this._windowSize = t.windowSize, this._delayA.connect(this._crossFade.a), this._delayB.connect(this._crossFade.b), this._frequency.fan(this._lfoA.frequency, this._lfoB.frequency, this._crossFadeLFO.frequency), this.effectSend.fan(this._delayA, this._delayB), this._crossFade.chain(this._feedbackDelay, this.effectReturn);
          const e = this.now();
          this._lfoA.start(e), this._lfoB.start(e), this._crossFadeLFO.start(e), this.windowSize = this._windowSize;
        }
        static getDefaults() {
          return Object.assign(Ca.getDefaults(), {pitch: 0, windowSize: 0.1, delayTime: 0, feedback: 0});
        }
        get pitch() {
          return this._pitch;
        }
        set pitch (t) {
          this._pitch = t;
          let e = 0;
          t < 0 ? (this._lfoA.min = 0, this._lfoA.max = this._windowSize, this._lfoB.min = 0, this._lfoB.max = this._windowSize, e = Math.pow(2, (t - 1) / 12) + 1) : (this._lfoA.min = this._windowSize, this._lfoA.max = 0, this._lfoB.min = this._windowSize, this._lfoB.max = 0, e = Math.pow(2, t / 12) - 1), this._frequency.value = e * (1.2 / this._windowSize);
        }
        get windowSize() {
          return this._windowSize;
        }
        set windowSize (t) {
          this._windowSize = this.toSeconds(t), this.pitch = this._pitch;
        }
        dispose() {
          return super.dispose(), this._frequency.dispose(), this._delayA.dispose(), this._delayB.dispose(), this._lfoA.dispose(), this._lfoB.dispose(), this._crossFade.dispose(), this._crossFadeLFO.dispose(), this._feedbackDelay.dispose(), this;
        }
      }
      class za extends Ta {
        constructor() {
          const t = ui(za.getDefaults(), arguments, ["frequency", "octaves", "baseFrequency"]);
          super(t), this.name = "Phaser", this._lfoL = new ar({context: this.context, frequency: t.frequency, min: 0, max: 1}), this._lfoR = new ar({context: this.context, frequency: t.frequency, min: 0, max: 1, phase: 180}), this._baseFrequency = this.toFrequency(t.baseFrequency), this._octaves = t.octaves, this.Q = new po({context: this.context, value: t.Q, units: "positive"}), this._filtersL = this._makeFilters(t.stages, this._lfoL), this._filtersR = this._makeFilters(t.stages, this._lfoR), this.frequency = this._lfoL.frequency, this.frequency.value = t.frequency, this.connectEffectLeft(...this._filtersL), this.connectEffectRight(...this._filtersR), this._lfoL.frequency.connect(this._lfoR.frequency), this.baseFrequency = t.baseFrequency, this.octaves = t.octaves, this._lfoL.start(), this._lfoR.start(), Di(this, ["frequency", "Q"]);
        }
        static getDefaults() {
          return Object.assign(Ta.getDefaults(), {frequency: 0.5, octaves: 3, stages: 10, Q: 10, baseFrequency: 350});
        }
        _makeFilters(t, e) {
          const s = [];
          for (let n = 0; n < t; n++) {
            const t = this.context.createBiquadFilter();
            t.type = "allpass", this.Q.connect(t.Q), e.connect(t.frequency), s.push(t);
          }
          return s;
        }
        get octaves() {
          return this._octaves;
        }
        set octaves (t) {
          this._octaves = t;
          const e = this._baseFrequency * Math.pow(2, t);
          this._lfoL.max = e, this._lfoR.max = e;
        }
        get baseFrequency() {
          return this._baseFrequency;
        }
        set baseFrequency (t) {
          this._baseFrequency = this.toFrequency(t), this._lfoL.min = this._baseFrequency, this._lfoR.min = this._baseFrequency, this.octaves = this._octaves;
        }
        dispose() {
          return super.dispose(), this.Q.dispose(), this._lfoL.dispose(), this._lfoR.dispose(), this._filtersL.forEach(t => t.disconnect()), this._filtersR.forEach(t => t.disconnect()), this.frequency.dispose(), this;
        }
      }
      class Wa extends la {
        constructor() {
          const t = ui(Wa.getDefaults(), arguments, ["decay"]);
          super(t), this.name = "Reverb", this._convolver = this.context.createConvolver(), this.ready = Promise.resolve(), this._decay = t.decay, this._preDelay = t.preDelay, this.generate(), this.connectEffect(this._convolver);
        }
        static getDefaults() {
          return Object.assign(la.getDefaults(), {decay: 1.5, preDelay: 0.01});
        }
        get decay() {
          return this._decay;
        }
        set decay (t) {
          Un(t = this.toSeconds(t), 0.001), this._decay = t, this.generate();
        }
        get preDelay() {
          return this._preDelay;
        }
        set preDelay (t) {
          Un(t = this.toSeconds(t), 0), this._preDelay = t, this.generate();
        }
        generate() {
          return ni(this, undefined, undefined, function* () {
            const t = this.ready, e = new qi(2, this._decay + this._preDelay, this.context.sampleRate), s = new zo({context: e}), n = new zo({context: e}), i = new ba({context: e});
            s.connect(i, 0, 0), n.connect(i, 0, 1);
            const o = new ho({context: e}).toDestination();
            i.connect(o), s.start(0), n.start(0), o.gain.setValueAtTime(0, 0), o.gain.setValueAtTime(1, this._preDelay), o.gain.exponentialApproachValueAtTime(0, this._preDelay, this.decay);
            const r = e.render();
            return this.ready = r.then(Ei), yield t, this._convolver.buffer = (yield r).get(), this;
          });
        }
        dispose() {
          return super.dispose(), this._convolver.disconnect(), this;
        }
      }
      class Ba extends io {
        constructor() {
          super(ui(Ba.getDefaults(), arguments)), this.name = "MidSideSplit", this._split = this.input = new wa({channels: 2, context: this.context}), this._midAdd = new ir({context: this.context}), this.mid = new $o({context: this.context, value: Math.SQRT1_2}), this._sideSubtract = new mr({context: this.context}), this.side = new $o({context: this.context, value: Math.SQRT1_2}), this._split.connect(this._midAdd, 0), this._split.connect(this._midAdd.addend, 1), this._split.connect(this._sideSubtract, 0), this._split.connect(this._sideSubtract.subtrahend, 1), this._midAdd.connect(this.mid), this._sideSubtract.connect(this.side);
        }
        dispose() {
          return super.dispose(), this.mid.dispose(), this.side.dispose(), this._midAdd.dispose(), this._sideSubtract.dispose(), this._split.dispose(), this;
        }
      }
      class Ua extends io {
        constructor() {
          super(ui(Ua.getDefaults(), arguments)), this.name = "MidSideMerge", this.mid = new ho({context: this.context}), this.side = new ho({context: this.context}), this._left = new ir({context: this.context}), this._leftMult = new $o({context: this.context, value: Math.SQRT1_2}), this._right = new mr({context: this.context}), this._rightMult = new $o({context: this.context, value: Math.SQRT1_2}), this._merge = this.output = new ba({context: this.context}), this.mid.fan(this._left), this.side.connect(this._left.addend), this.mid.connect(this._right), this.side.connect(this._right.subtrahend), this._left.connect(this._leftMult), this._right.connect(this._rightMult), this._leftMult.connect(this._merge, 0, 0), this._rightMult.connect(this._merge, 0, 1);
        }
        dispose() {
          return super.dispose(), this.mid.dispose(), this.side.dispose(), this._leftMult.dispose(), this._rightMult.dispose(), this._left.dispose(), this._right.dispose(), this;
        }
      }
      class Ga extends la {
        constructor(t) {
          super(t), this.name = "MidSideEffect", this._midSideMerge = new Ua({context: this.context}), this._midSideSplit = new Ba({context: this.context}), this._midSend = this._midSideSplit.mid, this._sideSend = this._midSideSplit.side, this._midReturn = this._midSideMerge.mid, this._sideReturn = this._midSideMerge.side, this.effectSend.connect(this._midSideSplit), this._midSideMerge.connect(this.effectReturn);
        }
        connectEffectMid(...t) {
          this._midSend.chain(...t, this._midReturn);
        }
        connectEffectSide(...t) {
          this._sideSend.chain(...t, this._sideReturn);
        }
        dispose() {
          return super.dispose(), this._midSideSplit.dispose(), this._midSideMerge.dispose(), this._midSend.dispose(), this._sideSend.dispose(), this._midReturn.dispose(), this._sideReturn.dispose(), this;
        }
      }
      class Qa extends Ga {
        constructor() {
          const t = ui(Qa.getDefaults(), arguments, ["width"]);
          super(t), this.name = "StereoWidener", this.width = new po({context: this.context, value: t.width, units: "normalRange"}), Di(this, ["width"]), this._twoTimesWidthMid = new $o({context: this.context, value: 2}), this._twoTimesWidthSide = new $o({context: this.context, value: 2}), this._midMult = new $o({context: this.context}), this._twoTimesWidthMid.connect(this._midMult.factor), this.connectEffectMid(this._midMult), this._oneMinusWidth = new mr({context: this.context}), this._oneMinusWidth.connect(this._twoTimesWidthMid), ro(this.context.getConstant(1), this._oneMinusWidth), this.width.connect(this._oneMinusWidth.subtrahend), this._sideMult = new $o({context: this.context}), this.width.connect(this._twoTimesWidthSide), this._twoTimesWidthSide.connect(this._sideMult.factor), this.connectEffectSide(this._sideMult);
        }
        static getDefaults() {
          return Object.assign(Ga.getDefaults(), {width: 0.5});
        }
        dispose() {
          return super.dispose(), this.width.dispose(), this._midMult.dispose(), this._sideMult.dispose(), this._twoTimesWidthMid.dispose(), this._twoTimesWidthSide.dispose(), this._oneMinusWidth.dispose(), this;
        }
      }
      class Za extends Ta {
        constructor() {
          const t = ui(Za.getDefaults(), arguments, ["frequency", "depth"]);
          super(t), this.name = "Tremolo", this._lfoL = new ar({context: this.context, type: t.type, min: 1, max: 0}), this._lfoR = new ar({context: this.context, type: t.type, min: 1, max: 0}), this._amplitudeL = new ho({context: this.context}), this._amplitudeR = new ho({context: this.context}), this.frequency = new po({context: this.context, value: t.frequency, units: "frequency"}), this.depth = new po({context: this.context, value: t.depth, units: "normalRange"}), Di(this, ["frequency", "depth"]), this.connectEffectLeft(this._amplitudeL), this.connectEffectRight(this._amplitudeR), this._lfoL.connect(this._amplitudeL.gain), this._lfoR.connect(this._amplitudeR.gain), this.frequency.fan(this._lfoL.frequency, this._lfoR.frequency), this.depth.fan(this._lfoR.amplitude, this._lfoL.amplitude), this.spread = t.spread;
        }
        static getDefaults() {
          return Object.assign(Ta.getDefaults(), {frequency: 10, type: "sine", depth: 0.5, spread: 180});
        }
        start(t) {
          return this._lfoL.start(t), this._lfoR.start(t), this;
        }
        stop(t) {
          return this._lfoL.stop(t), this._lfoR.stop(t), this;
        }
        sync() {
          return this._lfoL.sync(), this._lfoR.sync(), this.context.transport.syncSignal(this.frequency), this;
        }
        unsync() {
          return this._lfoL.unsync(), this._lfoR.unsync(), this.context.transport.unsyncSignal(this.frequency), this;
        }
        get type() {
          return this._lfoL.type;
        }
        set type (t) {
          this._lfoL.type = t, this._lfoR.type = t;
        }
        get spread() {
          return this._lfoR.phase - this._lfoL.phase;
        }
        set spread (t) {
          this._lfoL.phase = 90 - t / 2, this._lfoR.phase = t / 2 + 90;
        }
        dispose() {
          return super.dispose(), this._lfoL.dispose(), this._lfoR.dispose(), this._amplitudeL.dispose(), this._amplitudeR.dispose(), this.frequency.dispose(), this.depth.dispose(), this;
        }
      }
      class Xa extends la {
        constructor() {
          const t = ui(Xa.getDefaults(), arguments, ["frequency", "depth"]);
          super(t), this.name = "Vibrato", this._delayNode = new yo({context: this.context, delayTime: 0, maxDelay: t.maxDelay}), this._lfo = new ar({context: this.context, type: t.type, min: 0, max: t.maxDelay, frequency: t.frequency, phase: -90}).start().connect(this._delayNode.delayTime), this.frequency = this._lfo.frequency, this.depth = this._lfo.amplitude, this.depth.value = t.depth, Di(this, ["frequency", "depth"]), this.effectSend.chain(this._delayNode, this.effectReturn);
        }
        static getDefaults() {
          return Object.assign(la.getDefaults(), {maxDelay: 0.005, frequency: 5, depth: 0.1, type: "sine"});
        }
        get type() {
          return this._lfo.type;
        }
        set type (t) {
          this._lfo.type = t;
        }
        dispose() {
          return super.dispose(), this._delayNode.dispose(), this._lfo.dispose(), this.frequency.dispose(), this.depth.dispose(), this;
        }
      }
      class Ya extends io {
        constructor() {
          const t = ui(Ya.getDefaults(), arguments, ["type", "size"]);
          super(t), this.name = "Analyser", this._analysers = [], this._buffers = [], this.input = this.output = this._gain = new ho({context: this.context}), this._split = new wa({context: this.context, channels: t.channels}), this.input.connect(this._split), Un(t.channels, 1);
          for (let e = 0; e < t.channels; e++) this._analysers[e] = this.context.createAnalyser(), this._split.connect(this._analysers[e], e, 0);
          this.size = t.size, this.type = t.type, this.smoothing = t.smoothing;
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {size: 1024, smoothing: 0.8, type: "fft", channels: 1});
        }
        getValue() {
          return this._analysers.forEach((t, e) => {
            const s = this._buffers[e];
            "fft" === this._type ? t.getFloatFrequencyData(s) : "waveform" === this._type && t.getFloatTimeDomainData(s);
          }), 1 === this.channels ? this._buffers[0] : this._buffers;
        }
        get size() {
          return this._analysers[0].frequencyBinCount;
        }
        set size (t) {
          this._analysers.forEach((e, s) => {
            e.fftSize = 2 * t, this._buffers[s] = new Float32Array(t);
          });
        }
        get channels() {
          return this._analysers.length;
        }
        get type() {
          return this._type;
        }
        set type (t) {
          Bn("waveform" === t || "fft" === t, `Analyser: invalid type: ${t}`), this._type = t;
        }
        get smoothing() {
          return this._analysers[0].smoothingTimeConstant;
        }
        set smoothing (t) {
          this._analysers.forEach(e => e.smoothingTimeConstant = t);
        }
        dispose() {
          return super.dispose(), this._analysers.forEach(t => t.disconnect()), this._split.dispose(), this._gain.dispose(), this;
        }
      }
      class $a extends io {
        constructor() {
          super(ui($a.getDefaults(), arguments)), this.name = "MeterBase", this.input = this.output = this._analyser = new Ya({context: this.context, size: 256, type: "waveform"});
        }
        dispose() {
          return super.dispose(), this._analyser.dispose(), this;
        }
      }
      class Ha extends $a {
        constructor() {
          const t = ui(Ha.getDefaults(), arguments, ["smoothing"]);
          super(t), this.name = "Meter", this.input = this.output = this._analyser = new Ya({context: this.context, size: 256, type: "waveform", channels: t.channelCount}), this.smoothing = t.smoothing, this.normalRange = t.normalRange, this._rms = new Array(t.channelCount), this._rms.fill(0);
        }
        static getDefaults() {
          return Object.assign($a.getDefaults(), {smoothing: 0.8, normalRange: false, channelCount: 1});
        }
        getLevel() {
          return Kn("'getLevel' has been changed to 'getValue'"), this.getValue();
        }
        getValue() {
          const t = this._analyser.getValue(), e = (1 === this.channels ? [t] : t).map((t, e) => {
            const s = t.reduce((t, e) => t + e * e, 0), n = Math.sqrt(s / t.length);
            return this._rms[e] = Math.max(n, this._rms[e] * this.smoothing), this.normalRange ? this._rms[e] : Math.log(this._rms[e]) / Math.LN10 * 20;
          });
          return 1 === this.channels ? e[0] : e;
        }
        get channels() {
          return this._analyser.channels;
        }
        dispose() {
          return super.dispose(), this._analyser.dispose(), this;
        }
      }
      class Ja extends $a {
        constructor() {
          const t = ui(Ja.getDefaults(), arguments, ["size"]);
          super(t), this.name = "FFT", this.normalRange = t.normalRange, this._analyser.type = "fft", this.size = t.size;
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {normalRange: false, size: 1024, smoothing: 0.8});
        }
        getValue() {
          return this._analyser.getValue().map(t => this.normalRange ? Math.pow(10, t / 20) : t);
        }
        get size() {
          return this._analyser.size;
        }
        set size (t) {
          this._analyser.size = t;
        }
        get smoothing() {
          return this._analyser.smoothing;
        }
        set smoothing (t) {
          this._analyser.smoothing = t;
        }
        getFrequencyOfIndex(t) {
          return Bn(0 <= t && t < this.size, `index must be greater than or equal to 0 and less than ${this.size}`), t * this.context.sampleRate / (2 * this.size);
        }
      }
      class Ka extends $a {
        constructor() {
          super(ui(Ka.getDefaults(), arguments)), this.name = "DCMeter", this._analyser.type = "waveform", this._analyser.size = 256;
        }
        getValue() {
          return this._analyser.getValue()[0];
        }
      }
      class tc extends $a {
        constructor() {
          const t = ui(tc.getDefaults(), arguments, ["size"]);
          super(t), this.name = "Waveform", this._analyser.type = "waveform", this.size = t.size;
        }
        static getDefaults() {
          return Object.assign($a.getDefaults(), {size: 1024});
        }
        getValue() {
          return this._analyser.getValue();
        }
        get size() {
          return this._analyser.size;
        }
        set size (t) {
          this._analyser.size = t;
        }
      }
      class ec extends io {
        constructor() {
          const t = ui(ec.getDefaults(), arguments, ["solo"]);
          super(t), this.name = "Solo", this.input = this.output = new ho({context: this.context}), ec._allSolos.has(this.context) || ec._allSolos.set(this.context, new Set), ec._allSolos.get(this.context).add(this), this.solo = t.solo;
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {solo: false});
        }
        get solo() {
          return this._isSoloed();
        }
        set solo (t) {
          t ? this._addSolo() : this._removeSolo(), ec._allSolos.get(this.context).forEach(t => t._updateSolo());
        }
        get muted() {
          return 0 === this.input.gain.value;
        }
        _addSolo() {
          ec._soloed.has(this.context) || ec._soloed.set(this.context, new Set), ec._soloed.get(this.context).add(this);
        }
        _removeSolo() {
          ec._soloed.has(this.context) && ec._soloed.get(this.context).delete(this);
        }
        _isSoloed() {
          return ec._soloed.has(this.context) && ec._soloed.get(this.context).has(this);
        }
        _noSolos() {
          return !ec._soloed.has(this.context) || ec._soloed.has(this.context) && 0 === ec._soloed.get(this.context).size;
        }
        _updateSolo() {
          this._isSoloed() || this._noSolos() ? this.input.gain.value = 1 : this.input.gain.value = 0;
        }
        dispose() {
          return super.dispose(), ec._allSolos.get(this.context).delete(this), this._removeSolo(), this;
        }
      }
      ec._allSolos = new Map, ec._soloed = new Map;
      class sc extends io {
        constructor() {
          const t = ui(sc.getDefaults(), arguments, ["pan", "volume"]);
          super(t), this.name = "PanVol", this._panner = this.input = new da({context: this.context, pan: t.pan, channelCount: t.channelCount}), this.pan = this._panner.pan, this._volume = this.output = new xo({context: this.context, volume: t.volume}), this.volume = this._volume.volume, this._panner.connect(this._volume), this.mute = t.mute, Di(this, ["pan", "volume"]);
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {mute: false, pan: 0, volume: 0, channelCount: 1});
        }
        get mute() {
          return this._volume.mute;
        }
        set mute (t) {
          this._volume.mute = t;
        }
        dispose() {
          return super.dispose(), this._panner.dispose(), this.pan.dispose(), this._volume.dispose(), this.volume.dispose(), this;
        }
      }
      class nc extends io {
        constructor() {
          const t = ui(nc.getDefaults(), arguments, ["volume", "pan"]);
          super(t), this.name = "Channel", this._solo = this.input = new ec({solo: t.solo, context: this.context}), this._panVol = this.output = new sc({context: this.context, pan: t.pan, volume: t.volume, mute: t.mute, channelCount: t.channelCount}), this.pan = this._panVol.pan, this.volume = this._panVol.volume, this._solo.connect(this._panVol), Di(this, ["pan", "volume"]);
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {pan: 0, volume: 0, mute: false, solo: false, channelCount: 1});
        }
        get solo() {
          return this._solo.solo;
        }
        set solo (t) {
          this._solo.solo = t;
        }
        get muted() {
          return this._solo.muted || this.mute;
        }
        get mute() {
          return this._panVol.mute;
        }
        set mute (t) {
          this._panVol.mute = t;
        }
        _getBus(t) {
          return nc.buses.has(t) || nc.buses.set(t, new ho({context: this.context})), nc.buses.get(t);
        }
        send(t, e = 0) {
          const s = this._getBus(t), n = new ho({context: this.context, units: "decibels", gain: e});
          return this.connect(n), n.connect(s), n;
        }
        receive(t) {
          return this._getBus(t).connect(this), this;
        }
        dispose() {
          return super.dispose(), this._panVol.dispose(), this.pan.dispose(), this.volume.dispose(), this._solo.dispose(), this;
        }
      }
      nc.buses = new Map;
      class ic extends io {
        constructor() {
          super(ui(ic.getDefaults(), arguments)), this.name = "Mono", this.input = new ho({context: this.context}), this._merge = this.output = new ba({channels: 2, context: this.context}), this.input.connect(this._merge, 0, 0), this.input.connect(this._merge, 0, 1);
        }
        dispose() {
          return super.dispose(), this._merge.dispose(), this.input.dispose(), this;
        }
      }
      class oc extends io {
        constructor() {
          const t = ui(oc.getDefaults(), arguments, ["lowFrequency", "highFrequency"]);
          super(t), this.name = "MultibandSplit", this.input = new ho({context: this.context}), this.output = undefined, this.low = new Mr({context: this.context, frequency: 0, type: "lowpass"}), this._lowMidFilter = new Mr({context: this.context, frequency: 0, type: "highpass"}), this.mid = new Mr({context: this.context, frequency: 0, type: "lowpass"}), this.high = new Mr({context: this.context, frequency: 0, type: "highpass"}), this._internalChannels = [this.low, this.mid, this.high], this.lowFrequency = new po({context: this.context, units: "frequency", value: t.lowFrequency}), this.highFrequency = new po({context: this.context, units: "frequency", value: t.highFrequency}), this.Q = new po({context: this.context, units: "positive", value: t.Q}), this.input.fan(this.low, this.high), this.input.chain(this._lowMidFilter, this.mid), this.lowFrequency.fan(this.low.frequency, this._lowMidFilter.frequency), this.highFrequency.fan(this.mid.frequency, this.high.frequency), this.Q.connect(this.low.Q), this.Q.connect(this._lowMidFilter.Q), this.Q.connect(this.mid.Q), this.Q.connect(this.high.Q), Di(this, ["high", "mid", "low", "highFrequency", "lowFrequency"]);
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {Q: 1, highFrequency: 2500, lowFrequency: 400});
        }
        dispose() {
          return super.dispose(), Mi(this, ["high", "mid", "low", "highFrequency", "lowFrequency"]), this.low.dispose(), this._lowMidFilter.dispose(), this.mid.dispose(), this.high.dispose(), this.lowFrequency.dispose(), this.highFrequency.dispose(), this.Q.dispose(), this;
        }
      }
      class rc extends io {
        constructor() {
          const t = ui(rc.getDefaults(), arguments, ["positionX", "positionY", "positionZ"]);
          super(t), this.name = "Panner3D", this._panner = this.input = this.output = this.context.createPanner(), this.panningModel = t.panningModel, this.maxDistance = t.maxDistance, this.distanceModel = t.distanceModel, this.coneOuterGain = t.coneOuterGain, this.coneOuterAngle = t.coneOuterAngle, this.coneInnerAngle = t.coneInnerAngle, this.refDistance = t.refDistance, this.rolloffFactor = t.rolloffFactor, this.positionX = new no({context: this.context, param: this._panner.positionX, value: t.positionX}), this.positionY = new no({context: this.context, param: this._panner.positionY, value: t.positionY}), this.positionZ = new no({context: this.context, param: this._panner.positionZ, value: t.positionZ}), this.orientationX = new no({context: this.context, param: this._panner.orientationX, value: t.orientationX}), this.orientationY = new no({context: this.context, param: this._panner.orientationY, value: t.orientationY}), this.orientationZ = new no({context: this.context, param: this._panner.orientationZ, value: t.orientationZ});
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {coneInnerAngle: 360, coneOuterAngle: 360, coneOuterGain: 0, distanceModel: "inverse", maxDistance: 1e4, orientationX: 0, orientationY: 0, orientationZ: 0, panningModel: "equalpower", positionX: 0, positionY: 0, positionZ: 0, refDistance: 1, rolloffFactor: 1});
        }
        setPosition(t, e, s) {
          return this.positionX.value = t, this.positionY.value = e, this.positionZ.value = s, this;
        }
        setOrientation(t, e, s) {
          return this.orientationX.value = t, this.orientationY.value = e, this.orientationZ.value = s, this;
        }
        get panningModel() {
          return this._panner.panningModel;
        }
        set panningModel (t) {
          this._panner.panningModel = t;
        }
        get refDistance() {
          return this._panner.refDistance;
        }
        set refDistance (t) {
          this._panner.refDistance = t;
        }
        get rolloffFactor() {
          return this._panner.rolloffFactor;
        }
        set rolloffFactor (t) {
          this._panner.rolloffFactor = t;
        }
        get distanceModel() {
          return this._panner.distanceModel;
        }
        set distanceModel (t) {
          this._panner.distanceModel = t;
        }
        get coneInnerAngle() {
          return this._panner.coneInnerAngle;
        }
        set coneInnerAngle (t) {
          this._panner.coneInnerAngle = t;
        }
        get coneOuterAngle() {
          return this._panner.coneOuterAngle;
        }
        set coneOuterAngle (t) {
          this._panner.coneOuterAngle = t;
        }
        get coneOuterGain() {
          return this._panner.coneOuterGain;
        }
        set coneOuterGain (t) {
          this._panner.coneOuterGain = t;
        }
        get maxDistance() {
          return this._panner.maxDistance;
        }
        set maxDistance (t) {
          this._panner.maxDistance = t;
        }
        dispose() {
          return super.dispose(), this._panner.disconnect(), this.orientationX.dispose(), this.orientationY.dispose(), this.orientationZ.dispose(), this.positionX.dispose(), this.positionY.dispose(), this.positionZ.dispose(), this;
        }
      }
      class ac extends io {
        constructor() {
          const t = ui(ac.getDefaults(), arguments);
          super(t), this.name = "Recorder", this.input = new ho({context: this.context}), Bn(ac.supported, "Media Recorder API is not available"), this._stream = this.context.createMediaStreamDestination(), this.input.connect(this._stream), this._recorder = new MediaRecorder(this._stream.stream, {mimeType: t.mimeType});
        }
        static getDefaults() {
          return io.getDefaults();
        }
        get mimeType() {
          return this._recorder.mimeType;
        }
        static get supported() {
          return null !== ti && Reflect.has(ti, "MediaRecorder");
        }
        get state() {
          return "inactive" === this._recorder.state ? "stopped" : "paused" === this._recorder.state ? "paused" : "started";
        }
        start() {
          return ni(this, undefined, undefined, function* () {
            Bn("started" !== this.state, "Recorder is already started");
            const t = new Promise(t => {
              const e = () => {
                this._recorder.removeEventListener("start", e, false), t();
              };
              this._recorder.addEventListener("start", e, false);
            });
            return this._recorder.start(), yield t;
          });
        }
        stop() {
          return ni(this, undefined, undefined, function* () {
            Bn("stopped" !== this.state, "Recorder is not started");
            const t = new Promise(t => {
              const e = s => {
                this._recorder.removeEventListener("dataavailable", e, false), t(s.data);
              };
              this._recorder.addEventListener("dataavailable", e, false);
            });
            return this._recorder.stop(), yield t;
          });
        }
        pause() {
          return Bn("started" === this.state, "Recorder must be started"), this._recorder.pause(), this;
        }
        dispose() {
          return super.dispose(), this.input.dispose(), this._stream.disconnect(), this;
        }
      }
      class cc extends io {
        constructor() {
          const t = ui(cc.getDefaults(), arguments, ["threshold", "ratio"]);
          super(t), this.name = "Compressor", this._compressor = this.context.createDynamicsCompressor(), this.input = this._compressor, this.output = this._compressor, this.threshold = new no({minValue: this._compressor.threshold.minValue, maxValue: this._compressor.threshold.maxValue, context: this.context, convert: false, param: this._compressor.threshold, units: "decibels", value: t.threshold}), this.attack = new no({minValue: this._compressor.attack.minValue, maxValue: this._compressor.attack.maxValue, context: this.context, param: this._compressor.attack, units: "time", value: t.attack}), this.release = new no({minValue: this._compressor.release.minValue, maxValue: this._compressor.release.maxValue, context: this.context, param: this._compressor.release, units: "time", value: t.release}), this.knee = new no({minValue: this._compressor.knee.minValue, maxValue: this._compressor.knee.maxValue, context: this.context, convert: false, param: this._compressor.knee, units: "decibels", value: t.knee}), this.ratio = new no({minValue: this._compressor.ratio.minValue, maxValue: this._compressor.ratio.maxValue, context: this.context, convert: false, param: this._compressor.ratio, units: "positive", value: t.ratio}), Di(this, ["knee", "release", "attack", "ratio", "threshold"]);
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {attack: 0.003, knee: 30, ratio: 12, release: 0.25, threshold: -24});
        }
        get reduction() {
          return this._compressor.reduction;
        }
        dispose() {
          return super.dispose(), this._compressor.disconnect(), this.attack.dispose(), this.release.dispose(), this.threshold.dispose(), this.ratio.dispose(), this.knee.dispose(), this;
        }
      }
      class hc extends io {
        constructor() {
          const t = ui(hc.getDefaults(), arguments, ["threshold", "smoothing"]);
          super(t), this.name = "Gate", this._follower = new _a({context: this.context, smoothing: t.smoothing}), this._gt = new vr({context: this.context, value: Math.pow(10, t.threshold / 20)}), this.input = new ho({context: this.context}), this._gate = this.output = new ho({context: this.context}), this.input.connect(this._gate), this.input.chain(this._follower, this._gt, this._gate.gain);
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {smoothing: 0.1, threshold: -40});
        }
        get threshold() {
          return Math.log(this._gt.value) / Math.LN10 * 20;
        }
        set threshold (t) {
          this._gt.value = Math.pow(10, t / 20);
        }
        get smoothing() {
          return this._follower.smoothing;
        }
        set smoothing (t) {
          this._follower.smoothing = t;
        }
        dispose() {
          return super.dispose(), this.input.dispose(), this._follower.dispose(), this._gt.dispose(), this._gate.dispose(), this;
        }
      }
      class lc extends io {
        constructor() {
          const t = ui(lc.getDefaults(), arguments, ["threshold"]);
          super(t), this.name = "Limiter", this._compressor = this.input = this.output = new cc({context: this.context, ratio: 20, attack: 0.003, release: 0.01, threshold: t.threshold}), this.threshold = this._compressor.threshold, Di(this, "threshold");
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {threshold: -12});
        }
        get reduction() {
          return this._compressor.reduction;
        }
        dispose() {
          return super.dispose(), this._compressor.dispose(), this.threshold.dispose(), this;
        }
      }
      class uc extends io {
        constructor() {
          const t = ui(uc.getDefaults(), arguments);
          super(t), this.name = "MidSideCompressor", this._midSideSplit = this.input = new Ba({context: this.context}), this._midSideMerge = this.output = new Ua({context: this.context}), this.mid = new cc(Object.assign(t.mid, {context: this.context})), this.side = new cc(Object.assign(t.side, {context: this.context})), this._midSideSplit.mid.chain(this.mid, this._midSideMerge.mid), this._midSideSplit.side.chain(this.side, this._midSideMerge.side), Di(this, ["mid", "side"]);
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {mid: {ratio: 3, threshold: -24, release: 0.03, attack: 0.02, knee: 16}, side: {ratio: 6, threshold: -30, release: 0.25, attack: 0.03, knee: 10}});
        }
        dispose() {
          return super.dispose(), this.mid.dispose(), this.side.dispose(), this._midSideSplit.dispose(), this._midSideMerge.dispose(), this;
        }
      }
      class pc extends io {
        constructor() {
          const t = ui(pc.getDefaults(), arguments);
          super(t), this.name = "MultibandCompressor", this._splitter = this.input = new oc({context: this.context, lowFrequency: t.lowFrequency, highFrequency: t.highFrequency}), this.lowFrequency = this._splitter.lowFrequency, this.highFrequency = this._splitter.highFrequency, this.output = new ho({context: this.context}), this.low = new cc(Object.assign(t.low, {context: this.context})), this.mid = new cc(Object.assign(t.mid, {context: this.context})), this.high = new cc(Object.assign(t.high, {context: this.context})), this._splitter.low.chain(this.low, this.output), this._splitter.mid.chain(this.mid, this.output), this._splitter.high.chain(this.high, this.output), Di(this, ["high", "mid", "low", "highFrequency", "lowFrequency"]);
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {lowFrequency: 250, highFrequency: 2e3, low: {ratio: 6, threshold: -30, release: 0.25, attack: 0.03, knee: 10}, mid: {ratio: 3, threshold: -24, release: 0.03, attack: 0.02, knee: 16}, high: {ratio: 3, threshold: -24, release: 0.03, attack: 0.02, knee: 16}});
        }
        dispose() {
          return super.dispose(), this._splitter.dispose(), this.low.dispose(), this.mid.dispose(), this.high.dispose(), this.output.dispose(), this;
        }
      }
      class dc extends io {
        constructor() {
          const t = ui(dc.getDefaults(), arguments, ["low", "mid", "high"]);
          super(t), this.name = "EQ3", this.output = new ho({context: this.context}), this._internalChannels = [], this.input = this._multibandSplit = new oc({context: this.context, highFrequency: t.highFrequency, lowFrequency: t.lowFrequency}), this._lowGain = new ho({context: this.context, gain: t.low, units: "decibels"}), this._midGain = new ho({context: this.context, gain: t.mid, units: "decibels"}), this._highGain = new ho({context: this.context, gain: t.high, units: "decibels"}), this.low = this._lowGain.gain, this.mid = this._midGain.gain, this.high = this._highGain.gain, this.Q = this._multibandSplit.Q, this.lowFrequency = this._multibandSplit.lowFrequency, this.highFrequency = this._multibandSplit.highFrequency, this._multibandSplit.low.chain(this._lowGain, this.output), this._multibandSplit.mid.chain(this._midGain, this.output), this._multibandSplit.high.chain(this._highGain, this.output), Di(this, ["low", "mid", "high", "lowFrequency", "highFrequency"]), this._internalChannels = [this._multibandSplit];
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {high: 0, highFrequency: 2500, low: 0, lowFrequency: 400, mid: 0});
        }
        dispose() {
          return super.dispose(), Mi(this, ["low", "mid", "high", "lowFrequency", "highFrequency"]), this._multibandSplit.dispose(), this.lowFrequency.dispose(), this.highFrequency.dispose(), this._lowGain.dispose(), this._midGain.dispose(), this._highGain.dispose(), this.low.dispose(), this.mid.dispose(), this.high.dispose(), this.Q.dispose(), this;
        }
      }
      class fc extends io {
        constructor() {
          const t = ui(fc.getDefaults(), arguments, ["url", "onload"]);
          super(t), this.name = "Convolver", this._convolver = this.context.createConvolver(), this._buffer = new Ri(t.url, e => {
            this.buffer = e, t.onload();
          }), this.input = new ho({context: this.context}), this.output = new ho({context: this.context}), this._buffer.loaded && (this.buffer = this._buffer), this.normalize = t.normalize, this.input.chain(this._convolver, this.output);
        }
        static getDefaults() {
          return Object.assign(io.getDefaults(), {normalize: true, onload: Ei});
        }
        load(t) {
          return ni(this, undefined, undefined, function* () {
            this.buffer = yield this._buffer.load(t);
          });
        }
        get buffer() {
          return this._buffer.length ? this._buffer : null;
        }
        set buffer (t) {
          t && this._buffer.set(t), this._convolver.buffer && (this.input.disconnect(), this._convolver.disconnect(), this._convolver = this.context.createConvolver(), this.input.chain(this._convolver, this.output));
          const e = this._buffer.get();
          this._convolver.buffer = e || null;
        }
        get normalize() {
          return this._convolver.normalize;
        }
        set normalize (t) {
          this._convolver.normalize = t;
        }
        dispose() {
          return super.dispose(), this._buffer.dispose(), this._convolver.disconnect(), this;
        }
      }
      const gc = (Fi === Ii && ei && Ni(new Oi), Fi).transport;
      function vc() {
        return (Fi === Ii && ei && Ni(new Oi), Fi).transport;
      }
      const yc = (Fi === Ii && ei && Ni(new Oi), Fi).destination, xc = (Fi === Ii && ei && Ni(new Oi), Fi).destination;
      function wc() {
        return (Fi === Ii && ei && Ni(new Oi), Fi).destination;
      }
      const bc = (Fi === Ii && ei && Ni(new Oi), Fi).listener;
      function Tc() {
        return (Fi === Ii && ei && Ni(new Oi), Fi).listener;
      }
      const Sc = (Fi === Ii && ei && Ni(new Oi), Fi).draw;
      function kc() {
        return (Fi === Ii && ei && Ni(new Oi), Fi).draw;
      }
      const Ac = (Fi === Ii && ei && Ni(new Oi), Fi);
      const Oc = Ri, Dc = So, Mc = Lo;
    })(), n;
  })());
  